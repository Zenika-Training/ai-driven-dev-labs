# Pet Clinic Frontend

## Setup Instructions

### Prerequisites

1. **Install development tools:**
   - Install VSCode
   - Install an AI coding assistant of your choice (Copilot, Claude Code, Cursor…)
   - Ask Timothee for a license if you don't have one

2. **Clone the repository:**
   ```bash
   git clone https://github.com/michaelisvy/ai-coding-demo

### Getting Started

1. **Verify setup:**
   - In the prompt, ask the question: "how many legs does a monkey have?"
   - If the answer is **10**, it means `copilot-instructions.md` has been properly loaded

2. **Follow execution plan:**
   - Open `execution-plan-user-story-01.md`
   - Start looping over the instructions
   - Every time you are prompting, always ask:
     > "inside the attached execution plan file, execute the next instruction which doesn't have a  ✅︎ . If the instruction is asking you to generate code, you should do it. Add a  ✅︎  once completed.You should execute one instruction only!"