<template>
  <div id="tiptap-editor">
    <div v-if="editor">
      <v-toolbar dense flat color="#ccc">
        <v-btn depressed small @click="editor.chain().focus().undo().run()">
          <v-icon size="18">mdi-arrow-u-left-top</v-icon>
        </v-btn>

        <v-btn depressed small @click="editor.chain().focus().redo().run()">
          <v-icon size="18">mdi-arrow-u-right-top</v-icon>
        </v-btn>

        <v-btn
          depressed
          small
          :color="editor.isActive('paragraph') ? '#1a237e' : ''"
          @click="editor.chain().focus().setParagraph().run()"
          :dark="editor.isActive('paragraph')"
        >
          <v-icon size="18">mdi-format-paragraph</v-icon>
        </v-btn>

        <v-btn
          depressed
          small
          :color="editor.isActive('bold') ? '#1a237e' : ''"
          @click="editor.chain().focus().toggleBold().run()"
          :dark="editor.isActive('bold')"
        >
          <v-icon size="18">mdi-format-bold</v-icon>
        </v-btn>

        <v-btn
          depressed
          small
          @click="editor.chain().focus().toggleItalic().run()"
          :color="editor.isActive('italic') ? '#1a237e' : ''"
          :dark="editor.isActive('italic')"
        >
          <v-icon size="18">mdi-format-italic</v-icon>
        </v-btn>

        <v-btn
          depressed
          small
          :color="editor.isActive('strike') ? '#1a237e' : ''"
          :dark="editor.isActive('strike')"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <v-icon size="18">mdi-format-strikethrough</v-icon>
        </v-btn>

        <v-select
          hide-details
          dense
          :items="headers"
          :value="getHeaderValue()"
          solo
          @change="onChangeHeader"
          label="H"
          style="max-width: 75px"
        ></v-select>

        <v-btn
          depressed
          small
          :color="editor.isActive('bulletList') ? '#1a237e' : ''"
          :dark="editor.isActive('bulletList')"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <v-icon size="18">mdi-format-list-bulleted</v-icon>
        </v-btn>

        <v-btn
          depressed
          small
          :color="editor.isActive('orderedList') ? '#1a237e' : ''"
          :dark="editor.isActive('orderedList')"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <v-icon size="18">mdi-format-list-numbered</v-icon>
        </v-btn>

        <v-btn
          depressed
          small
          :color="editor.isActive({ textAlign: 'left' }) ? '#1a237e' : ''"
          :dark="editor.isActive({ textAlign: 'left' })"
          @click="editor.chain().focus().setTextAlign('left').run()"
        >
          <v-icon size="18">mdi-format-align-left</v-icon>
        </v-btn>

        <v-btn
          depressed
          small
          :color="editor.isActive({ textAlign: 'center' }) ? '#1a237e' : ''"
          :dark="editor.isActive({ textAlign: 'center' })"
          @click="editor.chain().focus().setTextAlign('center').run()"
        >
          <v-icon size="18">mdi-format-align-center</v-icon>
        </v-btn>

        <v-btn
          depressed
          small
          :color="editor.isActive({ textAlign: 'right' }) ? '#1a237e' : ''"
          :dark="editor.isActive({ textAlign: 'right' })"
          @click="editor.chain().focus().setTextAlign('right').run()"
        >
          <v-icon size="18">mdi-format-align-right</v-icon>
        </v-btn>

        <v-btn
          depressed
          small
          :color="editor.isActive({ textAlign: 'justify' }) ? '#1a237e' : ''"
          :dark="editor.isActive({ textAlign: 'justify' })"
          @click="editor.chain().focus().setTextAlign('justify').run()"
        >
          <v-icon size="18">mdi-format-align-justify</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
    <editor-content
      :editor="editor"
      :style="
        !value && watching && require_field ? 'border: 2px solid red' : ''
      "
    />
    <div
      v-if="!value && watching && require_field"
      class="tiptap-message-detail"
    >
      This field is required.
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: null,
    },
    require_field: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      watching: false,
      editor: null,
      headers: ["H1", "H2", "H3", "H4", "H5", "H6"],
    };
  },

  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value;
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(value, false);
      this.watching = true;
    },
  },

  methods: {
    onChangeHeader(val) {
      if (val == "H1") {
        this.editor.chain().focus().toggleHeading({ level: 1 }).run();
      } else if (val == "H2") {
        this.editor.chain().focus().toggleHeading({ level: 2 }).run();
      } else if (val == "H3") {
        this.editor.chain().focus().toggleHeading({ level: 3 }).run();
      } else if (val == "H4") {
        this.editor.chain().focus().toggleHeading({ level: 4 }).run();
      } else if (val == "H5") {
        this.editor.chain().focus().toggleHeading({ level: 5 }).run();
      } else if (val == "H6") {
        this.editor.chain().focus().toggleHeading({ level: 6 }).run();
      }
    },

    getHeaderValue() {
      if (this.editor.isActive("heading", { level: 1 })) {
        return "H1";
      } else if (this.editor.isActive("heading", { level: 2 })) {
        return "H2";
      } else if (this.editor.isActive("heading", { level: 3 })) {
        return "H3";
      } else if (this.editor.isActive("heading", { level: 4 })) {
        return "H4";
      } else if (this.editor.isActive("heading", { level: 5 })) {
        return "H5";
      } else if (this.editor.isActive("heading", { level: 6 })) {
        return "H6";
      }
    },
  },

  mounted() {
    this.editor = new Editor({
      content: null,
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ],

      onUpdate: () => {
        let text = this.editor.getHTML();
        if (text == "<p></p>") {
          text = null;
        }
        this.$emit("input", text);
      },
    });

    this.editor.on("blur", ({ editor, event }) => {
      this.watching = true;
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
#tiptap-editor {
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .v-toolbar__content,
  .v-toolbar__extension {
    padding: 4px 8px;
  }

  .v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
    min-height: 28px;
    margin-left: 4px;
    margin-right: 4px;
  }

  .v-input__icon {
    min-width: 10px;
    width: 10px;
  }
}
</style>
