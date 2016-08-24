## Framebuffer: Math

Let's go from some screen coordinate `$X_{s}, Y_{s}$` to a pixel index `$I_{p}$`. Our canvas is `$W$` pixels wide by `$H$` pixels tall.

$$
I_{p}=X_s + (Y_s * W)
$$

And the base memory address is `$I_{p} * 4$` (4 bytes = RGBA)

`$ A_r=4*I_p $`

`$ A_g=4*I_p + 1 $`

`$ A_b=4*I_p + 2 $`

`$ A_a=4*I_p + 3 $`
