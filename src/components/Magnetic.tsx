import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function Magnetic({ children }: { children: React.ReactNode }) {
    const magnetic = useRef<HTMLDivElement>(null);

    useEffect( () => {
        const xTo = gsap.quickTo(magnetic.current, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
        const yTo = gsap.quickTo(magnetic.current, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            if (magnetic.current) {
                const {width, height, left, top} = magnetic.current.getBoundingClientRect();
                const x = clientX - (left + width/2)
                const y = clientY - (top + height/2)
                xTo(x * 0.35);
                yTo(y * 0.35);
            }
        }

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        }

        const currentRef = magnetic.current;
        if (currentRef) {
            currentRef.addEventListener("mousemove", mouseMove)
            currentRef.addEventListener("mouseleave", mouseLeave)
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("mousemove", mouseMove)
                currentRef.removeEventListener("mouseleave", mouseLeave)
            }
        }
    }, [])

    return (
        <div ref={magnetic} style={{ display: 'inline-block' }}>
            {children}
        </div>
    )
}
