'use client';export function Drawer({children}:{children:React.ReactNode}){return <div className='fixed inset-0 z-50'>{children}</div>}
export function DrawerContent({className='',children}:{className?:string,children?:React.ReactNode}){return <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl ${className}`}>{children}</div>}
export function DrawerTrigger({children}:{children:React.ReactNode}){return <>{children}</>}
export function DrawerClose({asChild,children}:{asChild?:boolean,children?:React.ReactNode}){return <>{children}</>}
export function DrawerHeader({children}:{children:React.ReactNode}){return <div className='space-y-1.5 text-center sm:text-left'>{children}</div>}