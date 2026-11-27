#!/usr/bin/env python3
"""Bangun gambar produk sendiri: satu produk per gambar, gaya seragam.

Kenapa dibuat sendiri, bukan memakai foto stok: untuk jenis barang di toko ini,
bank foto gratis hampir selalu menampilkan model atau pemandangan (dan sumber
berbayar seperti iStock/Pixta tidak boleh dipakai). Pilihan yang tersisa adalah
gambar produk yang digambar sendiri dengan palet merek, sehingga setiap gambar
hanya menampilkan produknya dan seluruh grid terlihat konsisten.

Skrip ini menulis SVG, lalu Chrome headless merendernya ke PNG 700x700
(lihat scripts/render-product-images.sh).

Pakai: build-product-images.py <direktori-svg>
"""

import sys
from pathlib import Path

BONE = "#f4f2ec"
BONE_DEEP = "#eae6dd"
CHARCOAL = "#20211e"
EARTH = "#82735f"
EARTH_DARK = "#5c5140"
SAND = "#d8cebd"
CLAY = "#b4562f"
FOREST = "#34483a"
WHITE = "#ffffff"

SIZE = 700
STROKE = 7


def frame(inner: str) -> str:
    """Bingkai standar: latar lembut, bayangan kontak, dan isi produk."""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="{BONE}"/><stop offset="1" stop-color="{BONE_DEEP}"/>
</linearGradient>
<radialGradient id="glow" cx="0.5" cy="0.42" r="0.55">
<stop offset="0" stop-color="{WHITE}" stop-opacity="0.9"/><stop offset="1" stop-color="{WHITE}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="{SIZE}" height="{SIZE}" fill="url(#bg)"/>
<rect width="{SIZE}" height="{SIZE}" fill="url(#glow)"/>
<ellipse cx="350" cy="612" rx="168" ry="20" fill="{CHARCOAL}" opacity="0.09"/>
<ellipse cx="350" cy="612" rx="104" ry="12" fill="{CHARCOAL}" opacity="0.07"/>
<g stroke="{CHARCOAL}" stroke-width="{STROKE}" stroke-linejoin="round" stroke-linecap="round">
{inner}
</g>
</svg>
"""


def tee(body: str, stripe: str | None = None) -> str:
    """Kaos: siluet badan + lengan, kerah bulat."""
    detail = ""
    if stripe:
        for i in range(5):
            y = 300 + i * 52
            detail += f'<path d="M232 {y} H468" stroke="{stripe}" stroke-width="16" opacity="0.85"/>'
    return f"""
<path d="M262 176 L318 152 Q350 176 382 152 L438 176 L520 246 L470 316 L446 292 V552 Q350 566 254 552 V292 L230 316 L180 246 Z"
      fill="{body}"/>
<path d="M318 152 Q350 190 382 152" fill="none"/>
{detail}
"""


def shorts(body: str, hem: int = 400) -> str:
    """Celana pendek: pinggang elastis + dua kaki."""
    return f"""
<path d="M236 214 H464 V262 L452 {hem} H372 L350 320 L328 {hem} H248 L236 262 Z" fill="{body}"/>
<path d="M236 246 H464" fill="none" opacity="0.45"/>
<path d="M350 268 V320" fill="none" opacity="0.35"/>
<path d="M300 200 Q350 224 400 200" fill="none" opacity="0.35"/>
"""


def jacket(body: str, accent: str = CHARCOAL) -> str:
    """Jaket: lengan panjang, ritsleting tengah, kerah tinggi."""
    return f"""
<path d="M254 188 L318 158 Q350 184 382 158 L446 188 L438 566 Q350 580 262 566 Z" fill="{body}"/>
<path d="M256 192 L196 254 L164 430 L228 448 L288 266 Z" fill="{body}"/>
<path d="M444 192 L504 254 L536 430 L472 448 L412 266 Z" fill="{body}"/>
<path d="M350 184 V566" stroke="{accent}"/>
<path d="M318 158 L350 184 L382 158" fill="none"/>
<path d="M300 262 H330" fill="none" opacity="0.5"/>
<path d="M370 262 H400" fill="none" opacity="0.5"/>
<path d="M266 486 Q350 502 434 486" fill="none" opacity="0.4"/>
"""


def pants(body: str) -> str:
    """Celana panjang."""
    return f"""
<path d="M242 150 H458 V210 L446 590 H372 L350 330 L328 590 H254 L242 210 Z" fill="{body}"/>
<path d="M242 196 H458" fill="none" opacity="0.45"/>
<path d="M350 250 V330" fill="none" opacity="0.3"/>
<path d="M300 140 Q350 166 400 140" fill="none" opacity="0.35"/>
"""


def tights(body: str) -> str:
    """Legging ketat."""
    return f"""
<path d="M262 168 H438 V216 L424 592 H370 L350 340 L330 592 H276 L262 216 Z" fill="{body}"/>
<path d="M262 200 H438" fill="none" opacity="0.45"/>
<path d="M300 250 Q350 272 400 250" fill="none" opacity="0.25"/>
"""


def bra(body: str) -> str:
    """Sports bra: dua cup, tali bahu, gelang dada."""
    return f"""
<path d="M240 232 Q290 210 350 210 Q410 210 460 232 Q448 330 350 352 Q252 330 240 232 Z" fill="{body}"/>
<path d="M276 216 L238 142" fill="none" stroke-width="20"/>
<path d="M424 216 L462 142" fill="none" stroke-width="20"/>
<path d="M240 272 H460" fill="none" opacity="0.5"/>
<path d="M320 226 Q350 258 380 226" fill="none" opacity="0.35"/>
"""


def insulated_vest(body: str, accent: str = EARTH) -> str:
    """Gilet berlapis: panel jahitan mendatar, tanpa lengan."""
    baffles = "".join(
        f'<path d="M256 {y} Q350 {y + 14} 444 {y}" stroke="{accent}" stroke-width="4" opacity="0.7"/>'
        for y in range(270, 540, 46)
    )
    return f"""
<path d="M262 172 L318 148 Q350 174 382 148 L438 172 L494 234 L462 300 V556 Q350 572 238 556 V300 L206 234 Z"
      fill="{body}"/>
<path d="M350 148 V556" stroke="{accent}" stroke-width="5" opacity="0.8"/>
{baffles}
"""


def socks(body: str, accent: str = EARTH) -> str:
    """Dua kaus kaki."""
    def one(offset: int, flip: int) -> str:
        return f"""
<path d="M{250 + offset} 190 H{330 + offset} V380 Q{330 + offset} 420 {300 + offset} 440 H{236 + offset} Q{206 + offset} 430 {210 + offset} 400 Q{214 + offset} 372 {250 + offset} 356 Z" fill="{body}"/>
<path d="M{250 + offset} 232 H{330 + offset}" stroke="{accent}" stroke-width="6" opacity="0.8"/>
"""

    return one(0, 1) + one(150, -1)


def gloves(body: str, accent: str = EARTH) -> str:
    """Se pasang sarung tangan."""
    return f"""
<path d="M196 300 Q196 236 232 236 H286 Q300 214 316 236 H340 Q356 236 356 272 V392 Q356 470 276 470 Q196 470 196 392 Z" fill="{body}"/>
<path d="M196 366 H356" stroke="{accent}" stroke-width="6" opacity="0.75"/>
<path d="M468 300 Q468 236 432 236 H378 Q364 214 348 236 H324 Q308 236 308 272 V392 Q308 470 388 470 Q468 470 468 392 Z" fill="{body}"/>
<path d="M308 366 H468" stroke="{accent}" stroke-width="6" opacity="0.75"/>
"""


def cap(body: str, accent: str = CHARCOAL) -> str:
    """Topi berbayang, tampak samping."""
    return f"""
<path d="M214 384 Q206 262 322 246 Q436 258 444 384 Z" fill="{body}"/>
<path d="M444 384 Q520 384 540 404 Q470 424 214 424 Q206 404 214 384 Z" fill="{body}"/>
<path d="M322 246 V384" stroke="{accent}" stroke-width="5" opacity="0.55"/>
<circle cx="322" cy="256" r="12" fill="{accent}" opacity="0.7"/>
"""


def beanie(body: str, accent: str = EARTH) -> str:
    """Beanie rajutan."""
    return f"""
<path d="M212 396 Q212 240 350 240 Q488 240 488 396 Z" fill="{body}"/>
<rect x="200" y="384" width="300" height="62" rx="18" fill="{accent}"/>
<path d="M258 240 Q266 316 254 384" fill="none" opacity="0.3"/>
<path d="M350 232 Q354 312 350 384" fill="none" opacity="0.3"/>
<path d="M442 240 Q434 316 446 384" fill="none" opacity="0.3"/>
"""


def race_vest(body: str, accent: str = CHARCOAL) -> str:
    """Rompi balap: tali bahu, dua kantong botol depan."""
    return f"""
<path d="M262 178 L318 150 Q350 176 382 150 L438 178 L488 244 L452 306 V556 Q350 572 248 556 V306 L212 244 Z"
      fill="{body}"/>
<path d="M262 300 Q350 320 438 300" fill="none" stroke="{accent}" stroke-width="5" opacity="0.6"/>
<rect x="236" y="330" width="86" height="112" rx="16" fill="{accent}" opacity="0.85"/>
<rect x="378" y="330" width="86" height="112" rx="16" fill="{accent}" opacity="0.85"/>
<path d="M350 176 V556" stroke="{accent}" stroke-width="5" opacity="0.45"/>
"""


def backpack(body: str, accent: str = EARTH, size: str = "large") -> str:
    """Tas punggung: badan membulat, kantong depan, tali bahu."""
    top = 176 if size == "large" else 214
    bottom = 578 if size == "large" else 560
    return f"""
<path d="M266 {top + 34} Q266 {top} 306 {top} H394 Q434 {top} 434 {top + 34} V{bottom - 34} Q434 {bottom} 394 {bottom} H306 Q266 {bottom} 266 {bottom - 34} Z"
      fill="{body}"/>
<path d="M266 {top + 62} H434" fill="none" stroke="{accent}" stroke-width="6" opacity="0.6"/>
<rect x="300" y="{top + 104}" width="100" height="86" rx="16" fill="{accent}" opacity="0.75"/>
<path d="M306 {top + 20} Q286 {top - 34} 300 {top - 66}" fill="none" stroke="{accent}" stroke-width="9" opacity="0.85"/>
<path d="M394 {top + 20} Q414 {top - 34} 400 {top - 66}" fill="none" stroke="{accent}" stroke-width="9" opacity="0.85"/>
<path d="M266 {top + 44} Q232 {top + 120} 250 {bottom - 60}" fill="none" stroke="{accent}" stroke-width="9" opacity="0.7"/>
"""


def poles(body: str, accent: str = CHARCOAL) -> str:
    """Se pasang tongkat trekking."""
    def one(x: int) -> str:
        return f"""
<rect x="{x}" y="150" width="24" height="440" rx="12" fill="{body}"/>
<rect x="{x - 6}" y="250" width="36" height="26" rx="10" fill="{accent}"/>
<rect x="{x - 6}" y="380" width="36" height="26" rx="10" fill="{accent}"/>
<path d="M{x + 12} 130 Q{x + 12} 108 {x + 44} 108 Q{x + 60} 108 {x + 60} 124" fill="none" stroke="{body}" stroke-width="16"/>
<path d="M{x - 12} 590 H{x + 36} L{x + 12} 626 Z" fill="{accent}"/>
"""

    return one(280) + one(400)


def cubes(body: str, accent: str = EARTH) -> str:
    """Tiga packing cube bertumpuk."""
    return f"""
<rect x="196" y="386" width="308" height="150" rx="22" fill="{body}"/>
<rect x="216" y="318" width="268" height="132" rx="20" fill="{body}"/>
<rect x="236" y="250" width="228" height="120" rx="18" fill="{body}"/>
<path d="M236 296 H464" stroke="{accent}" stroke-width="7" opacity="0.8"/>
<path d="M216 366 H484" stroke="{accent}" stroke-width="7" opacity="0.8"/>
<path d="M196 436 H504" stroke="{accent}" stroke-width="7" opacity="0.8"/>
<rect x="318" y="272" width="64" height="18" rx="9" fill="{accent}"/>
<rect x="304" y="340" width="92" height="18" rx="9" fill="{accent}"/>
<rect x="292" y="408" width="116" height="18" rx="9" fill="{accent}"/>
"""


def bottle(body: str, accent: str = CHARCOAL) -> str:
    """Botol lembut: badan ramping, tutup putar."""
    return f"""
<path d="M292 236 H408 Q428 236 428 262 V540 Q428 578 390 578 H310 Q272 578 272 540 V262 Q272 236 292 236 Z"
      fill="{body}"/>
<rect x="312" y="176" width="76" height="64" rx="16" fill="{accent}"/>
<path d="M296 320 H404" stroke="{accent}" stroke-width="5" opacity="0.45"/>
<rect x="292" y="360" width="116" height="96" rx="14" fill="{accent}" opacity="0.55"/>
<path d="M350 300 V540" stroke="{accent}" stroke-width="4" opacity="0.25"/>
"""


def watch(body: str, accent: str = EARTH, band: str = CHARCOAL) -> str:
    """Jam tangan olahraga: tali + layar kotak membulat."""
    return f"""
<path d="M286 150 H414 Q424 150 424 166 V246 H276 V166 Q276 150 286 150 Z" fill="{band}"/>
<path d="M276 500 H424 V580 Q424 596 414 596 H286 Q276 596 276 580 Z" fill="{band}"/>
<rect x="248" y="228" width="204" height="290" rx="52" fill="{body}"/>
<rect x="272" y="262" width="156" height="200" rx="34" fill="{accent}" opacity="0.85"/>
<path d="M300 330 H360" stroke="{BONE}" stroke-width="12" opacity="0.95"/>
<path d="M300 366 H392" stroke="{BONE}" stroke-width="12" opacity="0.7"/>
<path d="M300 402 H340" stroke="{BONE}" stroke-width="12" opacity="0.55"/>
<rect x="424" y="330" width="18" height="66" rx="9" fill="{band}"/>
"""


def strap(body: str, accent: str = CLAY, pod: str = CHARCOAL) -> str:
    """Tali dada monitor detak jantung + pod sensor."""
    return f"""
<path d="M204 300 Q350 232 496 300 Q510 336 496 372 Q350 306 204 372 Q190 336 204 300 Z" fill="{body}"/>
<rect x="292" y="286" width="116" height="120" rx="26" fill="{pod}"/>
<circle cx="350" cy="346" r="26" fill="{accent}"/>
<path d="M232 320 Q350 262 468 320" fill="none" stroke="{accent}" stroke-width="5" opacity="0.5"/>
"""


def headlamp(body: str, accent: str = EARTH, lens: str = BONE) -> str:
    """Headlamp: rumah lampu, lensa, tali kepala."""
    return f"""
<path d="M198 306 Q198 276 236 276 H300 V396 H236 Q198 396 198 366 Z" fill="{body}"/>
<ellipse cx="196" cy="336" rx="34" ry="60" fill="{lens}" stroke="{CHARCOAL}" stroke-width="6"/>
<ellipse cx="196" cy="336" rx="18" ry="36" fill="{accent}" opacity="0.7"/>
<rect x="300" y="292" width="60" height="88" rx="16" fill="{accent}"/>
<path d="M360 300 Q500 268 552 356 Q586 418 520 448 Q468 470 436 420" fill="none" stroke="{body}" stroke-width="22" stroke-linecap="round"/>
<circle cx="330" cy="336" r="14" fill="{CHARCOAL}" opacity="0.75"/>
"""


def sunglasses(body: str, accent: str = CHARCOAL, lens: str = "#3c4a52") -> str:
    """Kacamata: dua lensa + jembatan + tangkai."""
    return f"""
<path d="M176 300 H332 Q340 300 340 320 V368 Q340 404 306 404 H232 Q186 404 178 366 Z" fill="{lens}"/>
<path d="M524 300 H368 Q360 300 360 320 V368 Q360 404 394 404 H468 Q514 404 522 366 Z" fill="{lens}"/>
<path d="M332 316 H368" stroke="{accent}" stroke-width="10"/>
<path d="M176 300 L146 280" stroke="{accent}" stroke-width="10"/>
<path d="M524 300 L554 280" stroke="{accent}" stroke-width="10"/>
<path d="M186 336 H332" stroke="{body}" stroke-width="8" opacity="0.55"/>
<path d="M368 336 H514" stroke="{body}" stroke-width="8" opacity="0.55"/>
"""


def gel_box(body: str, accent: str = CLAY) -> str:
    """Kotak berisi sachet energi."""
    sachets = "".join(
        f'<rect x="{236 + i * 46}" y="318" width="34" height="200" rx="12" fill="{accent}" opacity="0.9"/>'
        for i in range(5)
    )
    return f"""
<path d="M204 262 H496 V560 Q496 586 470 586 H230 Q204 586 204 560 Z" fill="{body}"/>
{sachets}
<path d="M204 300 H496" stroke="{CHARCOAL}" stroke-width="6" opacity="0.35"/>
<rect x="238" y="200" width="224" height="66" rx="14" fill="{CHARCOAL}" opacity="0.85"/>
<path d="M276 234 H424" stroke="{BONE}" stroke-width="12" opacity="0.9"/>
"""


def gel_packet(body: str, accent: str = CLAY) -> str:
    """Satu sachet energi dengan sobekan atas."""
    return f"""
<path d="M256 210 H444 Q462 210 462 232 V520 Q462 556 424 566 H276 Q238 556 238 520 V232 Q238 210 256 210 Z"
      fill="{body}"/>
<path d="M238 262 H462" stroke="{CHARCOAL}" stroke-width="6" opacity="0.5"/>
<path d="M300 218 L330 218" stroke="{CHARCOAL}" stroke-width="8" opacity="0.6"/>
<rect x="272" y="320" width="156" height="120" rx="16" fill="{accent}" opacity="0.85"/>
<path d="M296 380 H404" stroke="{BONE}" stroke-width="14" opacity="0.9"/>
<path d="M296 470 H404" stroke="{CHARCOAL}" stroke-width="10" opacity="0.35"/>
"""


def tube(body: str, accent: str = CLAY) -> str:
    """Tabung tablet elektrolit."""
    return f"""
<path d="M280 220 H420 Q440 220 440 244 V520 Q440 566 394 576 H306 Q260 566 260 520 V244 Q260 220 280 220 Z"
      fill="{body}"/>
<rect x="272" y="160" width="156" height="72" rx="18" fill="{accent}"/>
<rect x="286" y="316" width="128" height="150" rx="18" fill="{accent}" opacity="0.8"/>
<path d="M312 372 H388" stroke="{BONE}" stroke-width="13" opacity="0.95"/>
<path d="M312 410 H388" stroke="{BONE}" stroke-width="13" opacity="0.7"/>
<path d="M280 262 H420" stroke="{CHARCOAL}" stroke-width="5" opacity="0.35"/>
"""


def foam_roller(body: str, accent: str = EARTH) -> str:
    """Foam roller: tabung bertekstur."""
    return f"""
<rect x="196" y="288" width="308" height="136" rx="68" fill="{body}"/>
<path d="M256 296 V416" stroke="{accent}" stroke-width="8" opacity="0.6"/>
<path d="M316 296 V416" stroke="{accent}" stroke-width="8" opacity="0.6"/>
<path d="M376 296 V416" stroke="{accent}" stroke-width="8" opacity="0.6"/>
<path d="M436 296 V416" stroke="{accent}" stroke-width="8" opacity="0.6"/>
<ellipse cx="196" cy="356" rx="26" ry="68" fill="{accent}" opacity="0.55"/>
"""


def massage_ball(body: str, accent: str = CHARCOAL) -> str:
    """Bola pijat dengan alur."""
    return f"""
<circle cx="350" cy="356" r="150" fill="{body}"/>
<path d="M350 206 V506" stroke="{accent}" stroke-width="12" opacity="0.5"/>
<path d="M212 320 Q350 356 488 320" stroke="{accent}" stroke-width="12" opacity="0.5" fill="none"/>
<path d="M212 392 Q350 428 488 392" stroke="{accent}" stroke-width="12" opacity="0.5" fill="none"/>
<circle cx="300" cy="300" r="34" fill="{WHITE}" opacity="0.22"/>
"""


def reflective_vest(body: str, accent: str = BONE, trim: str = CLAY) -> str:
    """Rompi reflektif: panel terang + garis pemantul."""
    return f"""
<path d="M262 176 L318 150 Q350 176 382 150 L438 176 L492 240 L458 302 V556 Q350 572 242 556 V302 L208 240 Z"
      fill="{body}"/>
<path d="M262 300 Q350 320 438 300" stroke="{accent}" stroke-width="22" opacity="0.95" fill="none"/>
<path d="M262 400 Q350 420 438 400" stroke="{accent}" stroke-width="22" opacity="0.95" fill="none"/>
<path d="M350 176 V556" stroke="{trim}" stroke-width="8" opacity="0.85"/>
<rect x="272" y="330" width="60" height="48" rx="10" fill="{trim}" opacity="0.8"/>
<rect x="368" y="330" width="60" height="48" rx="10" fill="{trim}" opacity="0.8"/>
"""


# slug berkas -> (judul, fungsi gambar)
CATALOGUE = {
    "tee-charcoal": ("Kaos charcoal", lambda: tee(CHARCOAL)),
    "tee-forest": ("Kaos forest", lambda: tee(FOREST)),
    "tee-striped": ("Kaos bergaris", lambda: tee(BONE, stripe=FOREST)),
    "shorts": ("Celana pendek", lambda: shorts(CHARCOAL)),
    "shorts-long": ("Celana pendek 7 inci", lambda: shorts(FOREST, hem=452)),
    "jacket": ("Jaket shell", lambda: jacket(FOREST, accent=SAND)),
    "jacket-clay": ("Jaket clay", lambda: jacket(CLAY, accent=CHARCOAL)),
    "pants": ("Celana panjang", lambda: pants(CHARCOAL)),
    "tights": ("Legging", lambda: tights(CHARCOAL)),
    "tights-clay": ("Legging clay", lambda: tights(CLAY)),
    "bra": ("Sports bra", lambda: bra(CHARCOAL)),
    "bra-sand": ("Sports bra sand", lambda: bra(EARTH)),
    "vest-insulated": ("Gilet berlapis", lambda: insulated_vest(CHARCOAL)),
    "vest-insulated-clay": ("Gilet clay", lambda: insulated_vest(CLAY, accent=CHARCOAL)),
    "socks": ("Kaus kaki", lambda: socks(BONE, accent=FOREST)),
    "socks-charcoal": ("Kaus kaki charcoal", lambda: socks(CHARCOAL, accent=SAND)),
    "gloves": ("Sarung tangan", lambda: gloves(CHARCOAL, accent=EARTH)),
    "gloves-clay": ("Sarung tangan clay", lambda: gloves(CLAY, accent=CHARCOAL)),
    "cap": ("Topi", lambda: cap(CHARCOAL)),
    "beanie": ("Beanie", lambda: beanie(FOREST, accent=EARTH)),
    "race-vest": ("Rompi balap", lambda: race_vest(SAND, accent=CHARCOAL)),
    "race-vest-forest": ("Rompi balap forest", lambda: race_vest(FOREST, accent=SAND)),
    "backpack": ("Tas punggung", lambda: backpack(EARTH, accent=CHARCOAL)),
    "backpack-charcoal": ("Tas punggung charcoal", lambda: backpack(CHARCOAL, accent=SAND)),
    "backpack-small": ("Tas punggung kecil", lambda: backpack(EARTH, accent=CHARCOAL, size="small")),
    "poles": ("Tongkat trekking", lambda: poles(CHARCOAL, accent=CLAY)),
    "poles-sand": ("Tongkat trekking sand", lambda: poles(EARTH_DARK, accent=CHARCOAL)),
    "cubes": ("Packing cube", lambda: cubes(EARTH, accent=CHARCOAL)),
    "cubes-sand": ("Packing cube sand", lambda: cubes(SAND, accent=EARTH_DARK)),
    "bottle": ("Botol lembut", lambda: bottle(CLAY, accent=CHARCOAL)),
    "bottle-forest": ("Botol forest", lambda: bottle(FOREST, accent=SAND)),
    "watch": ("Jam olahraga", lambda: watch(CHARCOAL, accent=CLAY)),
    "watch-sand": ("Jam sand", lambda: watch(EARTH_DARK, accent=SAND, band=CHARCOAL)),
    "strap": ("Tali dada", lambda: strap(CHARCOAL)),
    "strap-clay": ("Tali dada clay", lambda: strap(EARTH_DARK, accent=CLAY)),
    "headlamp": ("Headlamp", lambda: headlamp(CHARCOAL, accent=SAND)),
    "headlamp-clay": ("Headlamp clay", lambda: headlamp(CLAY, accent=CHARCOAL)),
    "headlamp-forest": ("Headlamp forest", lambda: headlamp(FOREST, accent=SAND)),
    "sunglasses": ("Kacamata", lambda: sunglasses(EARTH_DARK, lens="#3c4a52")),
    "sunglasses-photo": ("Kacamata fotokromik", lambda: sunglasses(CHARCOAL, lens="#5b6a63")),
    "gel-box": ("Kotak gel", lambda: gel_box(EARTH, accent=CLAY)),
    "gel-packet": ("Sachet gel", lambda: gel_packet(CLAY)),
    "tube": ("Tabung elektrolit", lambda: tube(EARTH, accent=CLAY)),
    "tube-sand": ("Tabung elektrolit sand", lambda: tube(SAND, accent=EARTH_DARK)),
    "roller": ("Foam roller", lambda: foam_roller(EARTH, accent=CHARCOAL)),
    "ball": ("Bola pijat", lambda: massage_ball(CLAY, accent=CHARCOAL)),
    "reflective-vest": ("Rompi reflektif", lambda: reflective_vest(CHARCOAL)),
    "reflective-vest-clay": ("Rompi reflektif clay", lambda: reflective_vest(CLAY, accent=BONE, trim=CHARCOAL)),
}


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 2

    out_dir = Path(sys.argv[1])
    out_dir.mkdir(parents=True, exist_ok=True)
    for slug, (title, draw) in CATALOGUE.items():
        (out_dir / f"{slug}.svg").write_text(frame(draw()), encoding="utf-8")
    print(f"{len(CATALOGUE)} SVG -> {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
