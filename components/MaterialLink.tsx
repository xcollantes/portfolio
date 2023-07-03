/**
 * Custom adapt NextJS Link component to Material UI components.
 *
 * Adding a NextJS Link to Material UI components have styling issues where
 * an underline will be seen on logos and buttons.
 * https://github.com/xcollantes/checkmate-frontend/issues/26#issue-1443136618
 */
import { AnchorHTMLAttributes, forwardRef } from "react"
import Link, { LinkProps } from "next/link"
import { styled } from "@mui/material/styles"

const AUnstyled = styled("a")({})

interface MaterialLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<
      LinkProps,
      "href" | "as" | "onClick" | "onMouseEnter" | "onTouchStart"
    > {
  to: LinkProps["href"]
  linkAs?: LinkProps["as"]
}

export const MaterialLink = forwardRef<HTMLAnchorElement, MaterialLinkProps>(
  (props, ref) => {
    const {
      to,
      linkAs,
      replace,
      scroll,
      shallow,
      prefetch,
      legacyBehavior = true,
      locale,
      ...other
    } = props

    return (
      <Link
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
        locale={locale}
        legacyBehavior={legacyBehavior}
      >
        <AUnstyled ref={ref} {...other} />
      </Link>
    )
  }
)
