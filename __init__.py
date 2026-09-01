from .visual_grid_prompt import VisualGridPromptNode

NODE_CLASS_MAPPINGS = {
    "VisualGridPrompt": VisualGridPromptNode
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "VisualGridPrompt": "📐 Visual Grid Regional Prompt (비주얼 그리드 프롬프트)"
}

WEB_DIRECTORY = "./js"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
