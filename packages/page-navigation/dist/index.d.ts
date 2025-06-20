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

interface RootProps extends PageNavigationCallbacks {
    pages: Page[];
}
declare function Root({ pages, onPageSelect, onPageAdd, onPageReorder, onPageRename, onPageDelete, onPageDuplicate, }: RootProps): React.JSX.Element;

export { type Page, Root as PageNavigation, type PageNavigationCallbacks, type RenameDialogState };
