import * as React from 'react';
import { ReactNode } from 'react';

type Page = {
    id: string;
    name: string;
    icon: ReactNode;
    isActive?: boolean;
};
type RenameDialogState = {
    isOpen: boolean;
    pageId: string;
    currentName: string;
};
type PageNavigationCallbacks = {
    onPageSelect: (pageId: string) => void;
    onPageAdd: (afterPageId?: string) => void;
    onPageReorder: (activeId: string, overId: string) => void;
    onPageRename: (pageId: string, newName: string) => void;
    onPageDelete: (pageId: string) => void;
    onPageDuplicate: (pageId: string) => void;
};

interface PageNavigationProps extends PageNavigationCallbacks {
    pages: Page[];
}
declare function PageNavigation({ pages, onPageSelect, onPageAdd, onPageReorder, onPageRename, onPageDelete, onPageDuplicate, }: PageNavigationProps): React.JSX.Element;

export { type Page, PageNavigation, type PageNavigationCallbacks, type RenameDialogState };
