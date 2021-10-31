// With this code we are registering the different plugins that we will be taking in use
FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginImageResize
 )


 FilePond.setOptions({
    stylePanelAspectRatio : 150/100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150
 })
//With this line of code we are parsing all the file inputs from our html page into the file pond inputs
FilePond.parse(document.body);
