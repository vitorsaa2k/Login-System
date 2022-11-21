import { SVGAttributes } from "react";

interface FacebookLogoProps extends SVGAttributes<HTMLOrSVGElement> {}

export function FacebookLogo(props: FacebookLogoProps) {
  return (
    <svg
      width={29}
      height={29}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        cx={14.5}
        cy={13.34}
        rx={12.6875}
        ry={12.6875}
        fill="url(#paint0_linear_1_33)"
      />
      <path
        d="M19.225 18.38l.563-3.58h-3.525v-2.324c0-.98.491-1.935 2.07-1.935h1.605V7.492s-1.455-.242-2.846-.242c-2.905 0-4.802 1.715-4.802 4.82v2.73H9.063v3.58h3.227v8.658c.648.099 1.311.15 1.987.15.675 0 1.338-.051 1.986-.15V18.38h2.962z"
        fill="#F7F7F7"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_33"
          x1={14.5}
          y1={0.652496}
          x2={14.5}
          y2={25.9522}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#18ACFE" />
          <stop offset={1} stopColor="#0163E0" />
        </linearGradient>
      </defs>
    </svg>
  )
}