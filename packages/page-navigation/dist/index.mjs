var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/page-navigation.tsx
import * as React5 from "react";
import { useState as useState2 } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { Plus as Plus2 } from "lucide-react";
import { Button as Button3 } from "@workspace/ui";

// src/page-tab.tsx
import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit2, Trash2, Copy } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@workspace/ui";
function PageTab({
  page,
  onSelect,
  onRename,
  onDelete,
  onDuplicate,
  isDragging
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging
  } = useSortable({ id: page.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!isDragging) {
      onSelect(page.id);
    }
  };
  return /* @__PURE__ */ React.createElement(ContextMenu, null, /* @__PURE__ */ React.createElement(ContextMenuTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues(__spreadValues({
      ref: setNodeRef,
      style,
      className: `
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer
            transition-all duration-200 select-none touch-none
            ${page.isActive ? "bg-orange-50 text-orange-700 border border-orange-200" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}
            ${isSortableDragging ? "shadow-lg z-50" : ""}
          `,
      onClick: handleClick
    }, attributes), listeners),
    page.icon,
    /* @__PURE__ */ React.createElement("span", null, page.name)
  )), /* @__PURE__ */ React.createElement(ContextMenuContent, null, /* @__PURE__ */ React.createElement(ContextMenuItem, { onClick: () => onRename(page.id, page.name) }, /* @__PURE__ */ React.createElement(Edit2, { className: "w-4 h-4 mr-2" }), "Rename"), /* @__PURE__ */ React.createElement(ContextMenuItem, { onClick: () => onDuplicate(page.id) }, /* @__PURE__ */ React.createElement(Copy, { className: "w-4 h-4 mr-2" }), "Duplicate"), /* @__PURE__ */ React.createElement(
    ContextMenuItem,
    {
      onClick: () => onDelete(page.id),
      className: "text-red-600 focus:text-red-600"
    },
    /* @__PURE__ */ React.createElement(Trash2, { className: "w-4 h-4 mr-2" }),
    "Delete"
  )));
}

// src/add-page-space.tsx
import * as React2 from "react";
import { Plus } from "lucide-react";
import { Button } from "@workspace/ui";
function AddPageSpace({
  afterPageId,
  onAddPage,
  isHovered = false
}) {
  return /* @__PURE__ */ React2.createElement("div", { className: "relative flex items-center justify-center" }, /* @__PURE__ */ React2.createElement("div", { className: "absolute w-12 h-10 -mx-6 z-10" }), /* @__PURE__ */ React2.createElement(
    "div",
    {
      className: `
          transition-all duration-300 ease-out flex items-center justify-center
          ${isHovered ? "w-10" : "w-2"}
        `
    },
    /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: `
            transition-all duration-300 ease-out
            ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
          `
      },
      /* @__PURE__ */ React2.createElement(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-7 w-7 p-0 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 shadow-sm",
          onClick: () => onAddPage(afterPageId)
        },
        /* @__PURE__ */ React2.createElement(Plus, { className: "w-3 h-3" })
      )
    )
  ));
}

// src/rename-dialog.tsx
import * as React3 from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button as Button2,
  Label
} from "@workspace/ui";
import { Input } from "@workspace/ui";
function RenameDialog({
  state,
  newPageName,
  onNewPageNameChange,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ React3.createElement(Dialog, { open: state.isOpen, onOpenChange: (open) => !open && onCancel() }, /* @__PURE__ */ React3.createElement(DialogContent, null, /* @__PURE__ */ React3.createElement(DialogHeader, null, /* @__PURE__ */ React3.createElement(DialogTitle, null, "Rename Page")), /* @__PURE__ */ React3.createElement("div", { className: "grid gap-4 py-4" }, /* @__PURE__ */ React3.createElement("div", { className: "grid gap-2" }, /* @__PURE__ */ React3.createElement(Label, { htmlFor: "page-name" }, "Page Name"), /* @__PURE__ */ React3.createElement(
    Input,
    {
      id: "page-name",
      value: newPageName,
      onChange: (e) => onNewPageNameChange(e.target.value),
      onKeyDown: (e) => e.key === "Enter" && onConfirm(),
      autoFocus: true
    }
  ))), /* @__PURE__ */ React3.createElement(DialogFooter, null, /* @__PURE__ */ React3.createElement(Button2, { variant: "outline", onClick: onCancel }, "Cancel"), /* @__PURE__ */ React3.createElement(Button2, { onClick: onConfirm }, "Rename"))));
}

// src/drag-overlay.tsx
import * as React4 from "react";
import { DragOverlay as DndDragOverlay } from "@dnd-kit/core";
function DragOverlay({ draggedPage }) {
  return /* @__PURE__ */ React4.createElement(DndDragOverlay, null, draggedPage && /* @__PURE__ */ React4.createElement("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-white shadow-lg border border-gray-200" }, draggedPage.icon, /* @__PURE__ */ React4.createElement("span", null, draggedPage.name)));
}

// src/hooks/use-page-navigation.ts
import { useState, useCallback } from "react";
function usePageNavigationInternal(callbacks) {
  const [activeId, setActiveId] = useState(null);
  const [renameDialog, setRenameDialog] = useState({
    isOpen: false,
    pageId: "",
    currentName: ""
  });
  const [newPageName, setNewPageName] = useState("");
  const handleSelectPage = useCallback(
    (id) => {
      console.log("\u{1F3AF} Page selected:", { pageId: id });
      callbacks.onPageSelect(id);
    },
    [callbacks]
  );
  const handleRenamePage = useCallback((id, currentName) => {
    setRenameDialog({ isOpen: true, pageId: id, currentName });
    setNewPageName(currentName);
  }, []);
  const handleConfirmRename = useCallback(() => {
    if (newPageName.trim() && renameDialog.pageId) {
      console.log("\u270F\uFE0F Page renamed:", {
        pageId: renameDialog.pageId,
        oldName: renameDialog.currentName,
        newName: newPageName.trim()
      });
      callbacks.onPageRename(renameDialog.pageId, newPageName.trim());
    }
    setRenameDialog({ isOpen: false, pageId: "", currentName: "" });
    setNewPageName("");
  }, [newPageName, renameDialog, callbacks]);
  const handleCancelRename = useCallback(() => {
    setRenameDialog({ isOpen: false, pageId: "", currentName: "" });
    setNewPageName("");
  }, []);
  const handleDeletePage = useCallback(
    (id) => {
      console.log("\u{1F5D1}\uFE0F Page deleted:", { pageId: id });
      callbacks.onPageDelete(id);
    },
    [callbacks]
  );
  const handleDuplicatePage = useCallback(
    (id) => {
      console.log("\u{1F4CB} Page duplicated:", { pageId: id });
      callbacks.onPageDuplicate(id);
    },
    [callbacks]
  );
  const handleAddPage = useCallback(
    (afterId) => {
      console.log("\u2795 Page added:", { afterPageId: afterId || "end" });
      callbacks.onPageAdd(afterId);
    },
    [callbacks]
  );
  const handleReorderPages = useCallback(
    (activeId2, overId) => {
      console.log("\u{1F504} Pages reordered:", { activeId: activeId2, overId });
      callbacks.onPageReorder(activeId2, overId);
    },
    [callbacks]
  );
  return {
    activeId,
    setActiveId,
    renameDialog,
    newPageName,
    setNewPageName,
    handleSelectPage,
    handleRenamePage,
    handleConfirmRename,
    handleCancelRename,
    handleDeletePage,
    handleDuplicatePage,
    handleAddPage,
    handleReorderPages
  };
}

// src/page-navigation.tsx
function PageNavigation({
  pages,
  onPageSelect,
  onPageAdd,
  onPageReorder,
  onPageRename,
  onPageDelete,
  onPageDuplicate
}) {
  const [hoveredSpaceId, setHoveredSpaceId] = useState2(null);
  const callbacks = {
    onPageSelect,
    onPageAdd,
    onPageReorder,
    onPageRename,
    onPageDelete,
    onPageDuplicate
  };
  const {
    activeId,
    setActiveId,
    renameDialog,
    newPageName,
    setNewPageName,
    handleSelectPage,
    handleRenamePage,
    handleConfirmRename,
    handleCancelRename,
    handleDeletePage,
    handleDuplicatePage,
    handleAddPage,
    handleReorderPages
  } = usePageNavigationInternal(callbacks);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    if (active.id !== over.id) {
      handleReorderPages(active.id, over.id);
    }
  };
  const getPageTransform = (pageIndex, pageId) => {
    if (!hoveredSpaceId) return "";
    const hoveredIndex = pages.findIndex((page) => page.id === hoveredSpaceId);
    if (hoveredIndex === -1) return "";
    const distance = Math.abs(pageIndex - hoveredIndex);
    const direction = pageIndex > hoveredIndex ? 1 : -1;
    let movement = 0;
    if (distance === 1) {
      movement = 8 * direction;
    } else if (distance === 2) {
      movement = 4 * direction;
    } else if (distance === 3) {
      movement = 2 * direction;
    }
    return `translateX(${movement}px)`;
  };
  const draggedPage = activeId ? pages.find((page) => page.id === activeId) || null : null;
  return /* @__PURE__ */ React5.createElement("div", { className: "w-full bg-white border-b border-gray-200 px-6 py-3" }, /* @__PURE__ */ React5.createElement(
    DndContext,
    {
      sensors,
      collisionDetection: closestCenter,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd
    },
    /* @__PURE__ */ React5.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React5.createElement(
      SortableContext,
      {
        items: pages.map((p) => p.id),
        strategy: horizontalListSortingStrategy
      },
      /* @__PURE__ */ React5.createElement("div", { className: "flex items-center" }, pages.map((page, index) => /* @__PURE__ */ React5.createElement(React5.Fragment, { key: page.id }, /* @__PURE__ */ React5.createElement(
        "div",
        {
          style: {
            transform: getPageTransform(index, page.id),
            transition: "transform 300ms ease-out"
          }
        },
        /* @__PURE__ */ React5.createElement(
          PageTab,
          {
            page,
            onSelect: handleSelectPage,
            onRename: handleRenamePage,
            onDelete: handleDeletePage,
            onDuplicate: handleDuplicatePage,
            isDragging: !!activeId
          }
        )
      ), index < pages.length - 1 && /* @__PURE__ */ React5.createElement(
        "div",
        {
          onMouseEnter: () => setHoveredSpaceId(page.id),
          onMouseLeave: () => setHoveredSpaceId(null),
          className: "relative"
        },
        /* @__PURE__ */ React5.createElement(
          AddPageSpace,
          {
            afterPageId: page.id,
            onAddPage: handleAddPage,
            isHovered: hoveredSpaceId === page.id
          }
        )
      ))))
    ), /* @__PURE__ */ React5.createElement("div", { className: "ml-6" }, /* @__PURE__ */ React5.createElement(
      Button3,
      {
        variant: "ghost",
        size: "sm",
        className: "text-gray-500 hover:text-gray-700 gap-2",
        onClick: () => handleAddPage()
      },
      /* @__PURE__ */ React5.createElement(Plus2, { className: "w-4 h-4" }),
      "Add page"
    ))),
    /* @__PURE__ */ React5.createElement(DragOverlay, { draggedPage })
  ), /* @__PURE__ */ React5.createElement(
    RenameDialog,
    {
      state: renameDialog,
      newPageName,
      onNewPageNameChange: setNewPageName,
      onConfirm: handleConfirmRename,
      onCancel: handleCancelRename
    }
  ));
}
export {
  PageNavigation
};
//# sourceMappingURL=index.mjs.map