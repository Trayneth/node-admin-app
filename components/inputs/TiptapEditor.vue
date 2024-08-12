<template>
  <div id="tiptap-editor">
    <div v-if="editor">
      <v-toolbar dense flat outlined>
        <v-btn
          fab
          depressed
          x-small
          @click="editor.chain().focus().undo().run()"
        >
          <v-icon size="18">mdi-arrow-u-left-top</v-icon>
        </v-btn>

        <v-btn
          fab
          depressed
          x-small
          class="ml-2"
          @click="editor.chain().focus().redo().run()"
        >
          <v-icon size="18">mdi-arrow-u-right-top</v-icon>
        </v-btn>

        <v-btn
          :color="editor.isActive('paragraph') ? active_color : ''"
          :dark="editor.isActive('paragraph')"
          class="ml-2"
          fab
          depressed
          x-small
          @click="editor.chain().focus().setParagraph().run()"
        >
          <v-icon size="18">mdi-format-paragraph</v-icon>
        </v-btn>

        <v-btn
          :color="editor.isActive('bold') ? active_color : ''"
          :dark="editor.isActive('bold')"
          class="ml-2"
          fab
          depressed
          x-small
          @click="editor.chain().focus().toggleBold().run()"
        >
          <v-icon size="18">mdi-format-bold</v-icon>
        </v-btn>

        <v-btn
          :color="editor.isActive('italic') ? active_color : ''"
          :dark="editor.isActive('italic')"
          class="ml-2"
          depressed
          fab
          x-small
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <v-icon size="18">mdi-format-italic</v-icon>
        </v-btn>

        <v-btn
          :color="editor.isActive('strike') ? active_color : ''"
          :dark="editor.isActive('strike')"
          class="ml-2"
          fab
          depressed
          x-small
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <v-icon size="18">mdi-format-strikethrough</v-icon>
        </v-btn>

        <v-btn
          :color="editor.isActive('bulletList') ? active_color : ''"
          :dark="editor.isActive('bulletList')"
          fab
          depressed
          x-small
          class="ml-2"
          @click="editor.chain().focus().toggleBulletList().run()"
        >
          <v-icon size="18">mdi-format-list-bulleted</v-icon>
        </v-btn>

        <v-btn
          :color="editor.isActive('orderedList') ? active_color : ''"
          :dark="editor.isActive('orderedList')"
          fab
          depressed
          x-small
          class="ml-2"
          @click="editor.chain().focus().toggleOrderedList().run()"
        >
          <v-icon size="18">mdi-format-list-numbered</v-icon>
        </v-btn>

        <v-btn
          :color="editor.isActive({ textAlign: 'left' }) ? active_color : ''"
          :dark="editor.isActive({ textAlign: 'left' })"
          fab
          depressed
          x-small
          class="ml-2"
          @click="editor.chain().focus().setTextAlign('left').run()"
        >
          <v-icon size="18">mdi-format-align-left</v-icon>
        </v-btn>

        <v-btn
          :color="editor.isActive({ textAlign: 'center' }) ? active_color : ''"
          :dark="editor.isActive({ textAlign: 'center' })"
          fab
          depressed
          x-small
          class="ml-2"
          @click="editor.chain().focus().setTextAlign('center').run()"
        >
          <v-icon size="18">mdi-format-align-center</v-icon>
        </v-btn>

        <v-btn
          :color="editor.isActive({ textAlign: 'right' }) ? active_color : ''"
          :dark="editor.isActive({ textAlign: 'right' })"
          fab
          depressed
          x-small
          class="ml-2"
          @click="editor.chain().focus().setTextAlign('right').run()"
        >
          <v-icon size="18">mdi-format-align-right</v-icon>
        </v-btn>

        <v-btn
          :color="editor.isActive({ textAlign: 'justify' }) ? active_color : ''"
          :dark="editor.isActive({ textAlign: 'justify' })"
          fab
          depressed
          x-small
          class="ml-2"
          @click="editor.chain().focus().setTextAlign('justify').run()"
        >
          <v-icon size="18">mdi-format-align-justify</v-icon>
        </v-btn>

        <v-overflow-btn
          :items="headers"
          :value="getHeaderValue()"
          placeholder="H"
          hide-details
          item-value="level"
          dense
          class="ml-2"
          editable
          height="30"
          style="max-width: 60px"
          @change="onChangeHeader"
        ></v-overflow-btn>

        <v-overflow-btn
          :items="colors"
          placeholder="Color"
          :value="getColorValue()"
          hide-details
          dense
          class="ml-2"
          height="30"
          editable
          item-value="code"
          style="max-width: 60px"
          @change="onChangeColor"
        >
          <template #[`selection`]="{ item }">
            <v-icon :color="item.code" class="mt-1 ml-1"
              >mdi-format-color-text</v-icon
            >
          </template>

          <template #[`item`]="{ item }">
            <v-icon :color="item.code" size="14">mdi-square-rounded</v-icon>
            <span style="font-size: 12px; margin-left: 4px">{{
              item.text
            }}</span>
          </template>
        </v-overflow-btn>

        <v-overflow-btn
          :items="colors"
          placeholder="Color Highlight"
          :value="getColorHighlightValue()"
          hide-details
          dense
          class="ml-2"
          height="30"
          editable
          item-value="code"
          style="max-width: 60px"
          @change="onChangeColorHighlight"
        >
          <template #[`selection`]="{ item }">
            <v-icon :color="item.code" class="mt-1 ml-1"
              >mdi-format-color-fill</v-icon
            >
          </template>

          <template #[`item`]="{ item }">
            <v-icon :color="item.code" size="14">mdi-square-rounded</v-icon>
            <span style="font-size: 12px; margin-left: 4px">{{
              item.text
            }}</span>
          </template>
        </v-overflow-btn>
      </v-toolbar>
    </div>
    <editor-content
      :editor="editor"
      :class="!value && watching && requireField ? 'tiptap-error' : ''"
    />
    <div
      v-if="!value && watching && requireField"
      style="color: #ff7575; font-size: 12px; margin-left: 10px"
    >
      This field is required.
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import { TextAlign } from '@tiptap/extension-text-align';
import { StarterKit } from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Highlight } from '@tiptap/extension-highlight';

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: null,
    },
    requireField: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      watching: false,
      editor: null,
      active_color: '#009999',
      headers: [
        {
          text: 'H1',
          level: 1,
        },
        {
          text: 'H2',
          level: 2,
        },
        {
          text: 'H3',
          level: 3,
        },
        {
          text: 'H4',
          level: 4,
        },
        {
          text: 'H5',
          level: 5,
        },
        {
          text: 'H6',
          level: 6,
        },
      ],
      colors: [
        {
          text: 'No Color',
          code: null,
        },
        {
          text: 'Red',
          code: '#F98181',
        },
        {
          text: 'Orange',
          code: '#FBBC88',
        },
        {
          text: 'Yellow',
          code: '#FAF594',
        },
        {
          text: 'Blue',
          code: '#70CFF8',
        },
        {
          text: 'Green',
          code: '#B9F18D',
        },
        {
          text: 'Purple',
          code: '#958DF1',
        },
      ],
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

  mounted() {
    this.editor = new Editor({
      content: null,
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        TextStyle,
        Color,
        Highlight.configure({ multicolor: true }),
      ],

      onUpdate: () => {
        let text = this.editor.getHTML();
        if (text === '<p></p>') {
          text = null;
        }
        this.$emit('input', text);
      },
    });

    this.editor.on('blur', ({ editor, event }) => {
      this.watching = true;
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },

  methods: {
    onChangeHeader(data) {
      if (data) {
        this.editor.chain().focus().toggleHeading({ level: data }).run();
      }
    },

    getHeaderValue() {
      if (this.editor.getAttributes('heading').level) {
        return this.editor.getAttributes('heading').level;
      }
    },

    onChangeColor(data) {
      if (data) {
        this.editor.chain().focus().setColor(data).run();
      } else {
        this.editor.chain().focus().unsetColor().run();
      }
    },

    getColorValue() {
      if (this.editor.getAttributes('textStyle').color) {
        return this.editor.getAttributes('textStyle').color;
      } else {
        return null;
      }
    },

    onChangeColorHighlight(data) {
      if (data) {
        this.editor.chain().focus().toggleHighlight({ color: data }).run();
      } else {
        this.editor.chain().focus().unsetHighlight().run();
      }
    },

    getColorHighlightValue() {
      if (this.editor.getAttributes('highlight').color) {
        return this.editor.getAttributes('highlight').color;
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss">
#tiptap-editor {
  .v-autocomplete.v-select.v-input--is-focused input {
    min-width: 0px;
  }

  .ProseMirror {
    height: 300px;
    border: 1.5px solid #b9b9b9;
    padding: 10px;
    overflow: auto;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .ProseMirror:hover {
    border: 1.5px solid #4f4f4f;
  }

  .tiptap-error {
    .ProseMirror {
      outline-color: #ff7575;
      border: 2px solid #ff7575;
    }
  }

  .ProseMirror-focused {
    outline-color: #009999;
  }

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

  .v-input__icon {
    min-width: 5px;
    width: 5px;
  }

  .v-overflow-btn .v-input__append-inner {
    width: 20px;
  }

  .v-overflow-btn.v-input--dense input {
    margin-left: 5px;
  }

  .v-autocomplete.v-input > .v-input__control > .v-input__slot {
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
