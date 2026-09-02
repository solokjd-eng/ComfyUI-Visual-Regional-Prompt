from .visual_grid_prompt import VisualGridPromptNode

NODE_CLASS_MAPPINGS = {
    "VisualGridPrompt": VisualGridPromptNode,
    "VisualGridPromptNode": VisualGridPromptNode
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "VisualGridPrompt": "📐 Visual Grid Regional Prompt (Pro)",
    "VisualGridPromptNode": "📐 Visual Grid Regional Prompt (Pro)"
}

WEB_DIRECTORY = "./js"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
