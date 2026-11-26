import { Suspense } from "react";
import OrderClient from "./order-client";

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="container-x py-24 text-sm text-charcoal/50">Loading order…</div>}>
      <OrderClient params={params} />
    </Suspense>
  );
}
