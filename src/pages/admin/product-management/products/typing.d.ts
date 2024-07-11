/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@ckeditor/ckeditor5-react" {
  import Event from "@ckeditor/ckeditor5-utils/src/eventinfo";
  import { EditorConfig } from "@ckeditor/ckeditor5-core/src/editor/editorconfig";
  import CustomEditor from "ckeditor-options-remove-upload";
  import * as React from "react";
  const CKEditor: React.FunctionComponent<{
    disabled?: boolean;
    editor: typeof CustomEditor;
    data?: string;
    id?: string;
    config?: EditorConfig;
    onReady?: (editor: CustomEditor) => void;
    onChange?: (event: Event, editor: CustomEditor) => void;
    onBlur?: (event: Event, editor: CustomEditor) => void;
    onFocus?: (event: Event, editor: CustomEditor) => void;
    onError?: (event: Event, editor: CustomEditor) => void;
    style?: React.CSSProperties;
  }>;
  export { CKEditor };
}
declare module "ckeditor-options-remove-upload" {
  const CustomEditorBuild: any;

  export = CustomEditorBuild;
}
