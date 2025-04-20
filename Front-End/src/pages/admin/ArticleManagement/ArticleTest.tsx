import { useMemo, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";

// Đăng ký các module cần thiết
Quill.register("modules/imageResize", ImageResize);

const AlignStyle = Quill.import("attributors/style/align") as any;
Quill.register(AlignStyle, true);

export default function ArticleTest() {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
          ["image"],
        ],
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    }),
    []
  );

  // Thêm CSS để hình ảnh có thể căn chỉnh
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .ql-editor img {
        display: inline-block;
      }
      .ql-editor img.align-left {
        float: left;
        margin-right: 1em;
      }
      .ql-editor img.align-right {
        float: right;
        margin-left: 1em;
      }
      .ql-editor img.align-center {
        display: block;
        margin: 0 auto;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      placeholder="Viết nội dung của bạn..."
    />
  );
}
