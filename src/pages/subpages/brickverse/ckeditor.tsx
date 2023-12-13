import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Ckeditor = () => {
  return <CKEditor
    editor={ClassicEditor}
    data='<p>Hello from CKEditor&nbsp;5!</p>'
    onReady={editor => {
      // You can store the "editor" and use when it is needed.
      console.log( 'Editor is ready to use!', editor );
    }}
    onChange={( event ) => {
      console.log( event );
    }}
    onBlur={( event, editor ) => {
      console.log( 'Blur.', editor );
    }}
    onFocus={( event, editor ) => {
      console.log( 'Focus.', editor );
    }}
  />
}

export default Ckeditor

definePageConfig({
  navigationBarTitleText: 'Brickverse',
  enableShareAppMessage: true,
  enableShareTimeline: true,
  backgroundColor: '#d45645',
  backgroundColorTop: '#d45645',
  backgroundColorBottom: '#d45645',
  navigationBarBackgroundColor: '#d45645'
})
