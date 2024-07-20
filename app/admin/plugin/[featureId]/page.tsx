import React from "react";

export default function Page({ params }: { params: { featureId: string } }) {
    return <div>My Feature: {params.featureId}</div>
}