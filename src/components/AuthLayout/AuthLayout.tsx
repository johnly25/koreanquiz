import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode,
    buttonLabel: string,
    headerLabel: string,
    backgroundImageCSS: string,
}

export function AuthLayout(props: AuthLayoutProps) {
    return (
        <div className="flex-auto box-border grid grid-cols-12">
            <div className="col-span-4 p-12 pt-24 flex flex-col items-center">
                <div>
                    <div>
                        <p>{props.headerLabel}</p>
                    </div>
                    <div className="flex flex-col pb-4">
                        {props.children}
                    </div>
                    <button className="btn btn-block">{props.buttonLabel}</button>
                </div>
            </div>
            <div className="text-center col-span-8">
                <div className={"min-h-full max-h-full " + props.backgroundImageCSS}></div>
            </div>
        </div>
    )
}