import React from "react";
import {
  layoutIcons,
  contentIcons,
  mediaIcons,
  interactiveIcons,
} from "../icons";
import { CategorySection } from "./CategorySection";
import { CustomComponentForm } from "../CustomComponentCreator/CustomComponentForm";
import { useCustomComponents } from "../../../hooks/useCustomComponents";

const componentsByCategory = {
  layout: [
    { id: "container", label: "Container", icon: layoutIcons.container },
    { id: "grid", label: "Grid", icon: layoutIcons.grid },
    { id: "flex", label: "Flexbox", icon: layoutIcons.flex },
    { id: "navbar", label: "Navigation", icon: layoutIcons.navbar },
  ],
  content: [
    { id: "heading", label: "Heading", icon: contentIcons.heading },
    { id: "text", label: "Text", icon: contentIcons.text },
    { id: "list", label: "List", icon: contentIcons.list },
    { id: "table", label: "Table", icon: contentIcons.table },
  ],
  media: [
    { id: "image", label: "Image", icon: mediaIcons.image },
    { id: "video", label: "Video", icon: mediaIcons.video },
  ],
  interactive: [
    { id: "button", label: "Button", icon: interactiveIcons.button },
    { id: "link", label: "Link", icon: interactiveIcons.link },
    { id: "form", label: "Form", icon: interactiveIcons.form },
    { id: "input", label: "Input", icon: interactiveIcons.input },
  ],
};

export function ComponentList() {
  const { customComponents, addCustomComponent } = useCustomComponents();

  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-purple-400/20 hover:scrollbar-thumb-purple-400/30">
      <div className="p-2 space-y-3">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-100">Components</h3>
          <CustomComponentForm onCreateComponent={addCustomComponent} />
        </div>

        {/* Only show custom components section if there are custom components */}
        {customComponents.length > 0 && (
          <CategorySection
            title="Custom Components"
            components={customComponents}
            isCustom
          />
        )}

        {/* Only show built-in components after a custom component is created */}
        {customComponents.length > 0 &&
          Object.entries(componentsByCategory).map(([category, components]) => (
            <CategorySection
              key={category}
              title={category}
              components={components}
            />
          ))}

        {/* Show create component message when no components exist */}
        {customComponents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">
              Create your first component to get started
            </p>
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 mx-auto text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
