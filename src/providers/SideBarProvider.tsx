'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface SideBarContextType {
    expanded: boolean,
    setExpanded: Dispatch<SetStateAction<boolean>>
}

const SideBarContext = createContext<SideBarContextType>()

export default function SideBarProvider({ children }: { children: ReactNode }) {
    const [expanded, setExpanded] = useState(true);

    return (
        <SideBarContext value={{ expanded, setExpanded }}>
            {children}
        </SideBarContext>
    )
}

export const useSideBar = () => {
    return useContext(SideBarContext);
}
