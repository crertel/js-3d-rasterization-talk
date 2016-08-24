## Framebuffer: Layout

* Old times had framebuffers with weird layouts
* VGA used 4 64K buffers with 1 color each (red, green, blue, intensity)
 - Each plane packed 8 pixels into one byte (graphics card polled 4 planes simultaneously)
 - Other mode supported was packed: 1 byte per pixel, all on one plane, palletted color
