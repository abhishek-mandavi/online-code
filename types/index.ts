import type { Id } from "@/convex/_generated/dataModel";
import type { editor as MonacoEditor } from "monaco-editor";

// Theme config
export interface Theme {
  id: string;
  label: string;
  color: string;
}

// Language config
export interface Language {
  id: string;
  label: string;
  logoPath: string;
  monacoLanguage: string;
  defaultCode: string;
  pistonRuntime: LanguageRuntime;
}

export interface LanguageRuntime {
  language: string;
  version: string;
}

// API response from code execution
export interface ExecuteCodeResponse {
  compile?: {
    output: string;
  };
  run?: {
    output: string;
    stderr: string;
  };
}

// Code execution result structure
export interface ExecutionResult {
  code: string;
  output: string;
  error: string | null;
}

// Zustand store state for the editor
export interface CodeEditorState {
  language: string;
  output: string;
  isRunning: boolean;
  error: string | null;
  theme: string;
  fontSize: number;
  editor: MonacoEditor.IStandaloneCodeEditor | null;
  executionResult: ExecutionResult | null;

  setEditor: (editor: MonacoEditor.IStandaloneCodeEditor) => void;
  getCode: () => string;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  runCode: () => Promise<void>;
}

// Snippet data model
export interface Snippet {
  _id: Id<"snippets">;
  _creationTime: number;
  userId: string;
  language: string;
  code: string;
  title: string;
  userName: string;
}
