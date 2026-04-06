/**
 * Orbiting Circles — adapted from Magic UI (MIT).
 * Icons orbit a central element in circular paths.
 * Each ring has a rotating light beam (same technique as the hero pill).
 */
import React from "react";
import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  /** Speed of the beam rotation in seconds (default 3) */
  beamSpeed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  beamSpeed = 3,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  const size = radius * 2;

  return (
    <>
      {/* Dim static SVG ring */}
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle cx="50%" cy="50%" r={radius} fill="none" className="stroke-white/[0.05] stroke-1" />
        </svg>
      )}

      {/* HTML beam ring — rotating light, same technique as .glow-pill */}
      {path && (
        <div
          className={`orbit-beam-ring${reverse ? " orbit-beam-ring-reverse" : ""}`}
          style={{
            width: size,
            height: size,
            "--ring-speed": `${beamSpeed}s`,
          } as React.CSSProperties}
        />
      )}

      {/* Orbiting icon children */}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={{
              "--duration": calculatedDuration,
              "--radius": radius,
              "--angle": angle,
              "--icon-size": `${iconSize}px`,
            } as React.CSSProperties}
            className={cn(
              "animate-orbit absolute flex size-[var(--icon-size)] transform-gpu items-center justify-center rounded-full",
              { "[animation-direction:reverse]": reverse },
              className,
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
