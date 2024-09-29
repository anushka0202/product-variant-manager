"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, Trash2, Grip, MoreVertical } from "lucide-react";
import { Button, Menu, MenuItem, Snackbar, Alert, Slide } from "@mui/material";

const ProductTable = () => {
  const [states, setStates] = useState([
    { id: "state-1", filter: "Anarkali Kurtas" },
    { id: "state-2", filter: "On Sale" },
  ]);

  const [variants, setVariants] = useState([
    { id: "primary", name: "Primary Variant" },
    { id: "variant2", name: "Variant 2" },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "" });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedStates = Array.from(states);
    const [movedState] = reorderedStates.splice(result.source.index, 1);
    reorderedStates.splice(result.destination.index, 0, movedState);
    setStates(reorderedStates);
  };

  const addState = () => {
    const newState = { id: `state-${states.length + 1}`, filter: "New Filter" };
    setStates((prevStates) => [...prevStates, newState]);
    setToast({ open: true, message: `${newState.id} Added` });
  };

  const removeState = (id) => {
    setStates((prevStates) => prevStates.filter((state) => state.id !== id));
    setToast({ open: true, message: `${id} Removed` });
  };

  const addVariant = () => {
    const newVariant = {
      id: `variant${variants.length + 1}`,
      name: `Variant ${variants.length + 1}`,
    };
    setVariants((prevVariants) => [...prevVariants, newVariant]);
    setToast({ open: true, message: `${newVariant.name} Added` });
  };

  const removeVariant = (id) => {
    setVariants((prevVariants) =>
      prevVariants.filter((variant) => variant.id !== id)
    );
    handleCloseMenu();
    setToast({ open: true, message: `${id} Removed` });
  };

  const handleMenuClick = (event, variant) => {
    setAnchorEl(event.currentTarget);
    setSelectedVariant(variant);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedVariant(null);
  };

  return (
    <>
      <div className="rounded-3xl border border-gray-300 bg-gray-50 p-4">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "100%" }}>
            {/* Table Headings */}
            <thead>
              <tr>
                <th className="p-4 text-center border-r border-gray-300 sticky left-0 bg-gray-50 ">
                  Product Filter
                </th>
                {variants.map((variant) => (
                  <th
                    key={variant.id}
                    className="p-4 text-left border-r border-gray-300"
                  >
                    <div className="flex justify-between items-center">
                      <span>{variant.name}</span>
                      <Button
                        onClick={(e) => handleMenuClick(e, variant)}
                        className="text-black min-w-6 p-1"
                      >
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </th>
                ))}
                <th className="p-4"></th>
              </tr>
            </thead>

            {/* Table Values */}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="states">
                {(provided) => (
                  <tbody {...provided.droppableProps} ref={provided.innerRef}>
                    {states.map((state, index) => (
                      <Draggable
                        key={state.id}
                        draggableId={state.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              background: snapshot.isDragging
                                ? "lightblue"
                                : "white",
                            }}
                          >
                            <td className="p-4 border-r border-gray-300 sticky bg-gray-50 left-0 min-w-[550px]">
                              <div className="flex items-center relative group">
                                <div className="mr-4 flex flex-col gap-1 items-center">
                                  <button
                                    onClick={() => removeState(state.id)}
                                    className="text-red-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 size={24} />
                                  </button>
                                  <span className="flex gap-1 items-center">
                                    <div className="font-bold text-3xl text-center">
                                      {index + 1}
                                    </div>
                                    <Grip size={28} />
                                  </span>
                                </div>

                                <div className="flex-1 flex items-center justify-center w-full h-40 bg-white border-2 border-dashed border-gray-300 rounded-lg">
                                  {state.filter == "New Filter" ? (
                                    <Button
                                      title="Add Product Filters"
                                      variant="outlined"
                                      className="m-4 p-2 h-10 hover:bg-slate-100 bg-white text-center text-black border font-semibold border-gray-300 capitalize"
                                    >
                                      <Plus size={20} /> Add Product Filters
                                    </Button>
                                  ) : (
                                    <div className="flex items-center justify-center gap-2">
                                      <span className="font-semibold border border-gray-200 px-2 py-1 rounded-md">
                                        Product Collection
                                      </span>
                                      <span className="bg-green-50 border border-green-300 font-semibold text-green-600 px-2 py-1 rounded-md">
                                        contains
                                      </span>
                                      <span className="font-semibold border border-gray-200 px-2 py-1 rounded-md">
                                        {state.filter}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            {variants.map((variant) => (
                              <td
                                key={variant.id}
                                className="p-4 border-r border-gray-300 w-52 min-w-52 bg-gray-50"
                              >
                                <div className="flex-1 flex flex-col items-center justify-center w-full h-40 bg-white border-2 border-dashed border-gray-300 rounded-lg p-2">
                                  {state.filter == "New Filter"  ? (
                                    <Button
                                      title="Add Design"
                                      variant="outlined"
                                      className="m-4 p-2 h-10 hover:bg-slate-100 bg-white text-center text-black border font-semibold border-gray-300 capitalize"
                                    >
                                      <Plus size={20} /> Add Design
                                    </Button>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center gap-2">
                                      <img
                                        src={`https://picsum.photos/100/100?random=${state.id}-${variant.id}`}
                                        alt="Product"
                                        className="w-full h-28 object-cover"
                                      />
                                      <div className="text-sm">
                                        Product Name
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            ))}
                            <td className="p-4 bg-gray-50">
                              <Button
                                title="Add Variant"
                                onClick={addVariant}
                                variant="outlined"
                                className="m-4 p-2 h-10 min-w-10 hover:bg-slate-100 bg-white text-black border border-gray-300"
                              >
                                <Plus size={24} />
                              </Button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </DragDropContext>
          </table>
        </div>
        <Button
          title="Add State"
          onClick={addState}
          variant="outlined"
          className="m-4 p-2 h-10 min-w-10 hover:bg-slate-100 bg-white text-black border border-gray-300"
        >
          <Plus size={24} />
        </Button>
      </div>

      {/* Variant Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => selectedVariant && removeVariant(selectedVariant.id)}
        >
          Delete Variant
        </MenuItem>
      </Menu>

      {/* Toast */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toast.open}
        onClose={() => setToast({ open: false, message: "" })}
        autoHideDuration={1200}
        TransitionComponent={Slide}
      >
        <Alert variant="outlined" severity="success" className="bg-white">
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductTable;
