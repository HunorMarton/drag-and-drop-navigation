'use strict';

var React = require('react');
var ui = require('@workspace/ui');
var sortable = require('@dnd-kit/sortable');
var utilities = require('@dnd-kit/utilities');
var lucideReact = require('lucide-react');
var core = require('@dnd-kit/core');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

// src/root.tsx
function RenameDialog({
  state,
  newPageName,
  onNewPageNameChange,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ React__namespace.createElement(ui.Dialog, { open: state.isOpen, onOpenChange: (open) => !open && onCancel() }, /* @__PURE__ */ React__namespace.createElement(ui.DialogContent, null, /* @__PURE__ */ React__namespace.createElement(ui.DialogHeader, null, /* @__PURE__ */ React__namespace.createElement(ui.DialogTitle, null, "Rename Page")), /* @__PURE__ */ React__namespace.createElement("div", { className: "grid gap-4 py-4" }, /* @__PURE__ */ React__namespace.createElement("div", { className: "grid gap-2" }, /* @__PURE__ */ React__namespace.createElement(ui.Label, { htmlFor: "page-name" }, "Page Name"), /* @__PURE__ */ React__namespace.createElement(
    ui.Input,
    {
      id: "page-name",
      value: newPageName,
      onChange: (e) => onNewPageNameChange(e.target.value),
      onKeyDown: (e) => e.key === "Enter" && onConfirm(),
      autoFocus: true
    }
  ))), /* @__PURE__ */ React__namespace.createElement(ui.DialogFooter, null, /* @__PURE__ */ React__namespace.createElement(ui.Button, { variant: "outline", onClick: onCancel }, "Cancel"), /* @__PURE__ */ React__namespace.createElement(ui.Button, { onClick: onConfirm }, "Rename"))));
}
function usePageNavigationInternal(callbacks) {
  const [activeId, setActiveId] = React.useState(null);
  const [renameDialog, setRenameDialog] = React.useState({
    isOpen: false,
    pageId: "",
    currentName: ""
  });
  const [newPageName, setNewPageName] = React.useState("");
  const handleSelectPage = React.useCallback(
    (id) => {
      console.log("\u{1F3AF} Page selected:", { pageId: id });
      callbacks.onPageSelect(id);
    },
    [callbacks]
  );
  const handleRenamePage = React.useCallback((id, currentName) => {
    setRenameDialog({ isOpen: true, pageId: id, currentName });
    setNewPageName(currentName);
  }, []);
  const handleConfirmRename = React.useCallback(() => {
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
  const handleCancelRename = React.useCallback(() => {
    setRenameDialog({ isOpen: false, pageId: "", currentName: "" });
    setNewPageName("");
  }, []);
  const handleDeletePage = React.useCallback(
    (id) => {
      console.log("\u{1F5D1}\uFE0F Page deleted:", { pageId: id });
      callbacks.onPageDelete(id);
    },
    [callbacks]
  );
  const handleDuplicatePage = React.useCallback(
    (id) => {
      console.log("\u{1F4CB} Page duplicated:", { pageId: id });
      callbacks.onPageDuplicate(id);
    },
    [callbacks]
  );
  const handleAddPage = React.useCallback(
    (afterId) => {
      console.log("\u2795 Page added:", { afterPageId: afterId || "end" });
      callbacks.onPageAdd(afterId);
    },
    [callbacks]
  );
  const handleReorderPages = React.useCallback(
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
  } = sortable.useSortable({ id: page.id });
  const style = {
    transform: utilities.CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!isDragging) {
      onSelect(page.id);
    }
  };
  return /* @__PURE__ */ React__namespace.createElement(ui.ContextMenu, null, /* @__PURE__ */ React__namespace.createElement(ui.ContextMenuTrigger, { asChild: true }, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      ref: setNodeRef,
      style,
      className: `
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer
            transition-all duration-200 select-none touch-none
            ${page.isActive ? "bg-orange-50 text-orange-700 border border-orange-200" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}
            ${isSortableDragging ? "shadow-lg z-50" : ""}
          `,
      onClick: handleClick,
      ...attributes,
      ...listeners
    },
    page.icon,
    /* @__PURE__ */ React__namespace.createElement("span", null, page.name)
  )), /* @__PURE__ */ React__namespace.createElement(ui.ContextMenuContent, null, /* @__PURE__ */ React__namespace.createElement(ui.ContextMenuItem, { onClick: () => onRename(page.id, page.name) }, /* @__PURE__ */ React__namespace.createElement(lucideReact.Edit2, { className: "w-4 h-4 mr-2" }), "Rename"), /* @__PURE__ */ React__namespace.createElement(ui.ContextMenuItem, { onClick: () => onDuplicate(page.id) }, /* @__PURE__ */ React__namespace.createElement(lucideReact.Copy, { className: "w-4 h-4 mr-2" }), "Duplicate"), /* @__PURE__ */ React__namespace.createElement(
    ui.ContextMenuItem,
    {
      onClick: () => onDelete(page.id),
      className: "text-red-600 focus:text-red-600"
    },
    /* @__PURE__ */ React__namespace.createElement(lucideReact.Trash2, { className: "w-4 h-4 mr-2" }),
    "Delete"
  )));
}
function AddPageSpace({
  afterPageId,
  onAddPage,
  isHovered = false
}) {
  return /* @__PURE__ */ React__namespace.createElement("div", { className: "relative flex items-center justify-center" }, /* @__PURE__ */ React__namespace.createElement("div", { className: "absolute w-12 h-10 -mx-6 z-10" }), /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: `
          transition-all duration-300 ease-out flex items-center justify-center
          ${isHovered ? "w-10" : "w-2"}
        `
    },
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: `
            transition-all duration-300 ease-out
            ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
          `
      },
      /* @__PURE__ */ React__namespace.createElement(
        ui.Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-7 w-7 p-0 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 shadow-sm",
          onClick: () => onAddPage(afterPageId)
        },
        /* @__PURE__ */ React__namespace.createElement(lucideReact.Plus, { className: "w-3 h-3" })
      )
    )
  ));
}

// src/utils/get-page-transform.ts
var getPageTransform = (pageIndex, hoveredSpaceId, pages) => {
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
var AddPage = ({ handleAddPage }) => {
  return /* @__PURE__ */ React__namespace.createElement("div", { className: "ml-6" }, /* @__PURE__ */ React__namespace.createElement(
    ui.Button,
    {
      variant: "ghost",
      size: "sm",
      className: "text-gray-500 hover:text-gray-700 gap-2",
      onClick: () => handleAddPage()
    },
    /* @__PURE__ */ React__namespace.createElement(lucideReact.Plus, { className: "w-4 h-4" }),
    "Add page"
  ));
};
function DragOverlay({ draggedPage }) {
  return /* @__PURE__ */ React__namespace.createElement(core.DragOverlay, null, draggedPage && /* @__PURE__ */ React__namespace.createElement("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-white shadow-lg border border-gray-200" }, draggedPage.icon, /* @__PURE__ */ React__namespace.createElement("span", null, draggedPage.name)));
}

// src/components/drag-context.tsx
function DragContext({
  children,
  handleDragStart,
  handleDragEnd,
  draggedPage
}) {
  const sensors = core.useSensors(
    core.useSensor(core.PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    core.useSensor(core.KeyboardSensor, {
      coordinateGetter: sortable.sortableKeyboardCoordinates
    })
  );
  return /* @__PURE__ */ React__namespace.createElement(
    core.DndContext,
    {
      sensors,
      collisionDetection: core.closestCenter,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd
    },
    /* @__PURE__ */ React__namespace.createElement("div", { className: "flex items-center" }, children),
    /* @__PURE__ */ React__namespace.createElement(DragOverlay, { draggedPage })
  );
}

// src/components/page-navigation.tsx
function PageNavigation({
  pages,
  activeId,
  setActiveId,
  handleSelectPage,
  handleRenamePage,
  handleDeletePage,
  handleDuplicatePage,
  handleAddPage,
  handleReorderPages
}) {
  const [hoveredSpaceId, setHoveredSpaceId] = React.useState(null);
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
  const draggedPage = activeId ? pages.find((page) => page.id === activeId) || null : null;
  return /* @__PURE__ */ React__namespace.createElement(
    DragContext,
    {
      handleDragStart,
      handleDragEnd,
      draggedPage
    },
    /* @__PURE__ */ React__namespace.createElement(
      sortable.SortableContext,
      {
        items: pages.map((p) => p.id),
        strategy: sortable.horizontalListSortingStrategy
      },
      /* @__PURE__ */ React__namespace.createElement("div", { className: "flex items-center" }, pages.map((page, index) => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, { key: page.id }, /* @__PURE__ */ React__namespace.createElement(
        "div",
        {
          style: {
            transform: getPageTransform(index, hoveredSpaceId, pages),
            transition: "transform 300ms ease-out"
          }
        },
        /* @__PURE__ */ React__namespace.createElement(
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
      ), index < pages.length - 1 && /* @__PURE__ */ React__namespace.createElement(
        "div",
        {
          onMouseEnter: () => setHoveredSpaceId(page.id),
          onMouseLeave: () => setHoveredSpaceId(null),
          className: "relative"
        },
        /* @__PURE__ */ React__namespace.createElement(
          AddPageSpace,
          {
            afterPageId: page.id,
            onAddPage: handleAddPage,
            isHovered: hoveredSpaceId === page.id
          }
        )
      ))))
    ),
    /* @__PURE__ */ React__namespace.createElement(AddPage, { handleAddPage })
  );
}

// src/root.tsx
function Root({
  pages,
  onPageSelect,
  onPageAdd,
  onPageReorder,
  onPageRename,
  onPageDelete,
  onPageDuplicate
}) {
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
  return /* @__PURE__ */ React__namespace.createElement("div", { className: "w-full bg-white border-b border-gray-200 px-6 py-3" }, /* @__PURE__ */ React__namespace.createElement(
    PageNavigation,
    {
      pages,
      activeId,
      setActiveId,
      handleSelectPage,
      handleRenamePage,
      handleDeletePage,
      handleDuplicatePage,
      handleAddPage,
      handleReorderPages
    }
  ), /* @__PURE__ */ React__namespace.createElement(
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

exports.PageNavigation = Root;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map