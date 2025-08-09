/** Hidden image component for RCS preview workaround when OG tags aren't respected. */

export default function HiddenPreviewImage() {
  return (
    <img
      src="/preview_image/front.webp"
      alt=""
      style={{ display: "none" }}
    />
  )
}