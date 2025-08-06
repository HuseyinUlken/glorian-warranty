import { createContext, ReactNode, useContext, useState } from 'react';

interface CommandPaletteContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
    query: string;
    setQuery: (query: string) => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');

    const value = {
        open,
        setOpen,
        query,
        setQuery,
    };

    return <CommandPaletteContext.Provider value={value}>{children}</CommandPaletteContext.Provider>;
}

export function useCommandPalette() {
    const context = useContext(CommandPaletteContext);

    if (context === undefined) {
        throw new Error('useCommandPalette must be used within a CommandPaletteProvider');
    }

    return context;
}
