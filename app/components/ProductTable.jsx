"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, Trash2, Grip, MoreVertical, Edit2 } from "lucide-react";
import { Button } from "@mui/material";
import statesData from "../data/states";
import variantsData from "../data/variants";
import designsData from "../data/designs";
import VariantDropdownMenu from "./VariantDropdownMenu";
import DesignSelectionDialog from "./DesignSelectionDialog";
import Toast from "./Toast";

const ProductTable = () => {
  const [states, setStates] = useState(statesData);
  const [variants, setVariants] = useState(variantsData);
  const [designs, setDesigns] = useState(designsData);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "" });
  const [designDialogOpen, setDesignDialogOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedDesigns, setSelectedDesigns] = useState({});

  const nextId = (arr) => {
    // Extracting numeric IDs
    const existingIds = new Set(
      arr.map((item) => parseInt(item.id.split("-")[1]))
    );
    let id = 1;

    while (existingIds.has(id)) {
      id++;
    }

    return id;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedStates = Array.from(states);
    const [movedState] = reorderedStates.splice(result.source.index, 1);
    reorderedStates.splice(result.destination.index, 0, movedState);
    setStates(reorderedStates);
  };

  const addState = () => {
    const nextStateId = nextId(states);
    const newState = { id: `state-${nextStateId}`, filter: "New Filter" };
    setStates((prevStates) => [...prevStates, newState]);
    setToast({ open: true, message: `${newState.id} Added` });
  };

  const removeState = (id) => {
    // Filtering out the state to be removed
    const stateToRemove = states.find((state) => state.id === id);

    // If the state exists, proceed to remove it
    if (stateToRemove) {
      const newStates = states.filter((state) => state.id !== id);

      // Removing associated designs for this state
      const newSelectedDesigns = { ...selectedDesigns };
      Object.keys(newSelectedDesigns).forEach((key) => {
        if (key.startsWith(`${stateToRemove.id}-`)) {
          delete newSelectedDesigns[key];
        }
      });

      setSelectedDesigns(newSelectedDesigns);
      setStates(newStates);
      setToast({ open: true, message: `${id} Removed` });
    }
  };

  const addVariant = () => {
    const nextVariantId = nextId(variants);

    const newVariant = {
      id: `variant-${nextVariantId}`,
      name: `Variant ${nextVariantId}`,
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

  const openDesignDialog = (state, variant) => {
    setSelectedState(state);
    setSelectedVariant(variant);
    setDesignDialogOpen(true);
  };

  const closeDesignDialog = () => {
    setDesignDialogOpen(false);
    setSelectedState(null);
    setSelectedVariant(null);
    setSelectedDesign(null);
  };

  const handleDesignSelection = (design) => {
    setSelectedDesign(design);
    insertDesign();
  };

  const insertDesign = () => {
    if (selectedDesign && selectedState && selectedVariant) {
      const newSelectedDesigns = {
        ...selectedDesigns,
        [`${selectedState.id}-${selectedVariant.id}`]: selectedDesign,
      };
      setSelectedDesigns(newSelectedDesigns);
      closeDesignDialog();
      setToast({ open: true, message: `Design Inserted` });
    }
  };

  return (
    <>
      <div className="rounded-3xl border border-gray-300 bg-gray-50 p-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
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
                        sx={{
                          color: "black",
                          minWidth: "24px",
                          padding: "4px",
                        }}
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
                            className="relative group"
                          >
                            <td className="p-4 border-r border-gray-300 sticky bg-gray-50 left-0 min-w-[550px]">
                              <div className="flex items-center ">
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
                                      sx={{
                                        color: "black",
                                        height: "40px",
                                        padding: "8px",
                                        margin: "16px",
                                        backgroundColor: "white",
                                        textAlign: "center",
                                        borderColor: "#d1d5db",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        ":hover": {
                                          backgroundColor: "#f1f5f9",
                                        },
                                      }}
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
                                <div className="flex-1 flex flex-col items-center justify-center w-40 h-40 bg-white border-2 border-dashed border-gray-300 rounded-lg p-2 relative group">
                                  {selectedDesigns[
                                    `${state.id}-${variant.id}`
                                  ] ? (
                                    <>
                                      <div className="flex flex-col items-center h-36 w-36 justify-center gap-2">
                                        <img
                                          src={
                                            selectedDesigns[
                                              `${state.id}-${variant.id}`
                                            ].image
                                          }
                                          alt="Selected Design"
                                          className="w-full h-28 object-cover"
                                        />
                                        <div className="text-sm">
                                          {
                                            selectedDesigns[
                                              `${state.id}-${variant.id}`
                                            ].name
                                          }
                                        </div>
                                      </div>
                                      <Button
                                        title="Edit Design"
                                        onClick={() =>
                                          openDesignDialog(state, variant)
                                        }
                                        variant="outlined"
                                        sx={{
                                          opacity: 0,
                                          ".group:hover &": {
                                            opacity: 1,
                                          },
                                          position: "absolute",
                                          top: "25%",
                                          left: "25%",
                                          color: "black",
                                          height: "40px",
                                          minWidth: "40px",
                                          padding: "8px",
                                          margin: "16px",
                                          backgroundColor: "white",
                                          textAlign: "center",
                                          borderColor: "#d1d5db",
                                          ":hover": {
                                            backgroundColor: "#f1f5f9",
                                          },
                                        }}
                                      >
                                        <Edit2 size={24} />
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Button
                                        title="Add Design"
                                        variant="outlined"
                                        sx={{
                                          color: "black",
                                          height: "40px",
                                          padding: "8px",
                                          backgroundColor: "white",
                                          textAlign: "center",
                                          borderColor: "#d1d5db",
                                          textTransform: "none",
                                          fontWeight: 600,
                                          ":hover": {
                                            backgroundColor: "#f1f5f9",
                                          },
                                        }}
                                        onClick={() =>
                                          openDesignDialog(state, variant)
                                        }
                                      >
                                        <Plus size={20} /> Add Design
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </td>
                            ))}
                            <td className="p-4 bg-gray-50">
                              <Button
                                title="Add Variant"
                                onClick={addVariant}
                                variant="outlined"
                                sx={{
                                  color: "black",
                                  height: "40px",
                                  minWidth: "40px",
                                  padding: "8px",
                                  margin: "16px",
                                  backgroundColor: "white",
                                  textAlign: "center",
                                  borderColor: "#d1d5db",
                                  ":hover": {
                                    backgroundColor: "#f1f5f9",
                                  },
                                }}
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
          sx={{
            color: "black",
            height: "40px",
            minWidth: "40px",
            padding: "8px",
            margin: "16px",
            backgroundColor: "white",
            textAlign: "center",
            borderColor: "#d1d5db",
            ":hover": {
              backgroundColor: "#f1f5f9",
            },
          }}
        >
          <Plus size={24} />
        </Button>
      </div>

      {/* Variant Dropdown Menu */}
      <VariantDropdownMenu
        anchorEl={anchorEl}
        handleCloseMenu={handleCloseMenu}
        selectedVariant={selectedVariant}
        removeVariant={removeVariant}
      />

      {/* Design Selection Dialog */}
      <DesignSelectionDialog
        open={designDialogOpen}
        closeDialog={closeDesignDialog}
        designs={designs}
        handleDesignSelection={handleDesignSelection}
      />

      {/* Toast */}
      <Toast
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: "" })}
      />
    </>
  );
};

export default ProductTable;
