<template>
    <div class="row mt-1">
        <div class="col-12">
            <label>{{ this.label }}</label>
            <ckeditor
                :value="value"
                :config="editorConfig"
                tag-name="textarea"
                @input="onInput"
            ></ckeditor>
        </div>
    </div>
</template>

<script>
import CKEditor from 'ckeditor4-vue'
export default {
    name: "CKEditor",
    components: {
        ckeditor: CKEditor.component
    },
    props: {
        label: {
            type: String,
            required: true,
        },
        value: "",
    },

    data() {
        return {
            editorConfig: {
                // The configuration of the editor.
                preset: 'full',
                uiColor: '#CCEAEE',
                extraPlugins: 'dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,xml,ajax,templates,menu,contextmenu,copyformatting,div,editorplaceholder,resize,elementspath,enterkey,entities,exportpdf,popup,filetools,filebrowser,find,floatingspace,listblock,richcombo,font,fakeobjects,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastetools,pastefromgdocs,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage',
                editorplaceholder: 'Start typing here...',
                toolbarGroups: [
                    { name: 'document', groups: ['mode', 'document', 'doctools'] },
                    { name: 'clipboard', groups: ['undo', 'clipboard'] },
                    { name: 'styles', groups: ['styles'] },
                    { name: 'colors', groups: ['colors'] },
                    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                    { name: 'forms', groups: ['forms'] },
                    { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                    { name: 'links', groups: ['links'] },
                    { name: 'insert', groups: ['insert'] },
                    { name: 'tools', groups: ['tools'] },
                    { name: 'others', groups: ['others'] },
                    { name: 'about', groups: ['about'] }
                ],
                removeButtons: 'Source,Save,NewPage,ExportPdf,Preview,Print,Templates,Find,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Language,ShowBlocks,About,Image,Iframe,Table,Anchor'
            }
        };
    },
    methods: {
        onInput: function (e) {
            this.$emit("input", e);
        },
    },
};
</script>

<style>
.ck-editor__editable {
    min-height:50px;
}
</style>