"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  PageNavigation: () => PageNavigation
});
module.exports = __toCommonJS(index_exports);

// src/page-navigation.tsx
var React5 = __toESM(require("react"));
var import_react2 = require("react");
var import_core2 = require("@dnd-kit/core");
var import_sortable2 = require("@dnd-kit/sortable");
var import_lucide_react3 = require("lucide-react");
var import_ui5 = require("@workspace/ui");

// src/page-tab.tsx
var React = __toESM(require("react"));
var import_sortable = require("@dnd-kit/sortable");
var import_utilities = require("@dnd-kit/utilities");
var import_lucide_react = require("lucide-react");
var import_ui = require("@workspace/ui");
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
  } = (0, import_sortable.useSortable)({ id: page.id });
  const style = {
    transform: import_utilities.CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!isDragging) {
      onSelect(page.id);
    }
  };
  return /* @__PURE__ */ React.createElement(import_ui.ContextMenu, null, /* @__PURE__ */ React.createElement(import_ui.ContextMenuTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(
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
  )), /* @__PURE__ */ React.createElement(import_ui.ContextMenuContent, null, /* @__PURE__ */ React.createElement(import_ui.ContextMenuItem, { onClick: () => onRename(page.id, page.name) }, /* @__PURE__ */ React.createElement(import_lucide_react.Edit2, { className: "w-4 h-4 mr-2" }), "Rename"), /* @__PURE__ */ React.createElement(import_ui.ContextMenuItem, { onClick: () => onDuplicate(page.id) }, /* @__PURE__ */ React.createElement(import_lucide_react.Copy, { className: "w-4 h-4 mr-2" }), "Duplicate"), /* @__PURE__ */ React.createElement(
    import_ui.ContextMenuItem,
    {
      onClick: () => onDelete(page.id),
      className: "text-red-600 focus:text-red-600"
    },
    /* @__PURE__ */ React.createElement(import_lucide_react.Trash2, { className: "w-4 h-4 mr-2" }),
    "Delete"
  )));
}

// src/add-page-space.tsx
var React2 = __toESM(require("react"));
var import_lucide_react2 = require("lucide-react");
var import_ui2 = require("@workspace/ui");
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
        import_ui2.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-7 w-7 p-0 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 shadow-sm",
          onClick: () => onAddPage(afterPageId)
        },
        /* @__PURE__ */ React2.createElement(import_lucide_react2.Plus, { className: "w-3 h-3" })
      )
    )
  ));
}

// src/rename-dialog.tsx
var React3 = __toESM(require("react"));
var import_ui3 = require("@workspace/ui");
var import_ui4 = require("@workspace/ui");
function RenameDialog({
  state,
  newPageName,
  onNewPageNameChange,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ React3.createElement(import_ui3.Dialog, { open: state.isOpen, onOpenChange: (open) => !open && onCancel() }, /* @__PURE__ */ React3.createElement(import_ui3.DialogContent, null, /* @__PURE__ */ React3.createElement(import_ui3.DialogHeader, null, /* @__PURE__ */ React3.createElement(import_ui3.DialogTitle, null, "Rename Page")), /* @__PURE__ */ React3.createElement("div", { className: "grid gap-4 py-4" }, /* @__PURE__ */ React3.createElement("div", { className: "grid gap-2" }, /* @__PURE__ */ React3.createElement(import_ui3.Label, { htmlFor: "page-name" }, "Page Name"), /* @__PURE__ */ React3.createElement(
    import_ui4.Input,
    {
      id: "page-name",
      value: newPageName,
      onChange: (e) => onNewPageNameChange(e.target.value),
      onKeyDown: (e) => e.key === "Enter" && onConfirm(),
      autoFocus: true
    }
  ))), /* @__PURE__ */ React3.createElement(import_ui3.DialogFooter, null, /* @__PURE__ */ React3.createElement(import_ui3.Button, { variant: "outline", onClick: onCancel }, "Cancel"), /* @__PURE__ */ React3.createElement(import_ui3.Button, { onClick: onConfirm }, "Rename"))));
}

// src/drag-overlay.tsx
var React4 = __toESM(require("react"));
var import_core = require("@dnd-kit/core");
function DragOverlay({ draggedPage }) {
  return /* @__PURE__ */ React4.createElement(import_core.DragOverlay, null, draggedPage && /* @__PURE__ */ React4.createElement("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-white shadow-lg border border-gray-200" }, draggedPage.icon, /* @__PURE__ */ React4.createElement("span", null, draggedPage.name)));
}

// src/hooks/use-page-navigation-internal.ts
var import_react = require("react");
function usePageNavigationInternal(callbacks) {
  const [activeId, setActiveId] = (0, import_react.useState)(null);
  const [renameDialog, setRenameDialog] = (0, import_react.useState)({
    isOpen: false,
    pageId: "",
    currentName: ""
  });
  const [newPageName, setNewPageName] = (0, import_react.useState)("");
  const handleSelectPage = (0, import_react.useCallback)(
    (id) => {
      console.log("\u{1F3AF} Page selected:", { pageId: id });
      callbacks.onPageSelect(id);
    },
    [callbacks]
  );
  const handleRenamePage = (0, import_react.useCallback)((id, currentName) => {
    setRenameDialog({ isOpen: true, pageId: id, currentName });
    setNewPageName(currentName);
  }, []);
  const handleConfirmRename = (0, import_react.useCallback)(() => {
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
  const handleCancelRename = (0, import_react.useCallback)(() => {
    setRenameDialog({ isOpen: false, pageId: "", currentName: "" });
    setNewPageName("");
  }, []);
  const handleDeletePage = (0, import_react.useCallback)(
    (id) => {
      console.log("\u{1F5D1}\uFE0F Page deleted:", { pageId: id });
      callbacks.onPageDelete(id);
    },
    [callbacks]
  );
  const handleDuplicatePage = (0, import_react.useCallback)(
    (id) => {
      console.log("\u{1F4CB} Page duplicated:", { pageId: id });
      callbacks.onPageDuplicate(id);
    },
    [callbacks]
  );
  const handleAddPage = (0, import_react.useCallback)(
    (afterId) => {
      console.log("\u2795 Page added:", { afterPageId: afterId || "end" });
      callbacks.onPageAdd(afterId);
    },
    [callbacks]
  );
  const handleReorderPages = (0, import_react.useCallback)(
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
  const [hoveredSpaceId, setHoveredSpaceId] = (0, import_react2.useState)(null);
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
  const sensors = (0, import_core2.useSensors)(
    (0, import_core2.useSensor)(import_core2.PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    (0, import_core2.useSensor)(import_core2.KeyboardSensor, {
      coordinateGetter: import_sortable2.sortableKeyboardCoordinates
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
    import_core2.DndContext,
    {
      sensors,
      collisionDetection: import_core2.closestCenter,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd
    },
    /* @__PURE__ */ React5.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React5.createElement(
      import_sortable2.SortableContext,
      {
        items: pages.map((p) => p.id),
        strategy: import_sortable2.horizontalListSortingStrategy
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
      import_ui5.Button,
      {
        variant: "ghost",
        size: "sm",
        className: "text-gray-500 hover:text-gray-700 gap-2",
        onClick: () => handleAddPage()
      },
      /* @__PURE__ */ React5.createElement(import_lucide_react3.Plus, { className: "w-4 h-4" }),
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PageNavigation
});
//# sourceMappingURL=index.js.map