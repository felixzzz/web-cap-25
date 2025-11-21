export type MarqueeProp = {
  children: React.ReactNode
}

export function Marquee({ children }: MarqueeProp) {
  return (
    <>
      <div className="animate-marquee whitespace-nowrap">{children}</div>
      <div className="animate-marquee2 absolute whitespace-nowrap">
        {children}
      </div>
    </>
  )
}
