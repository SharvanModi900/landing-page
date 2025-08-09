import React from 'react';
export default function PoPPArchitectureVisual() {
  return (
    <section className="relative w-full min-h-[900px] flex flex-col items-center justify-center overflow-hidden">
      <img
        src="/popp-architecture.png"
        alt="PoPP Architecture"
        className="w-full "
        style={{ maxHeight: 1000 }}
      />
      {/* Optionally overlay interactive or accessible content here */}
      
    </section>
  );
}