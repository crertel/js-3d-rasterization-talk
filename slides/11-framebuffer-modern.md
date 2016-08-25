## Framebuffer: Modern

* Modern framebuffers exist only as regions of memory
* They are drawn into windows using a process called *compositing*
* All pixels exist as **packed RGB** or **packed RGBA**
 - Each pixel has 1 byte for red, green, blue, and optionally alpha
 - There is no space between pixels in memory
 - The rows of the framebuffer (a **scanline**) are laid out in descending order