---
title: 'Scripting, Modularity, and Control: What Makes BSPWM a Seamless Tiling WM'
excerpt: How do I got into a WM manager that gives me minimalism and flexibility
publishDate: 'Feb 6 2025'
tags:
  - window manager
  - linux
  - bspwm
seo:
  image:
    src: '/bspwm.jpg'
    alt: BSPWM and SXHKD configs in neovim
---

![BSPWM and SXHKD configs in neovim](/bspwm.png)

## The BSPWM

---

BSPWM (Binary Space Partitioning Window Manager) is a lightweight and highly configurable tiling window manager that offers control through bash scripting. Unlike most WMs, BSPWM doesn’t handle keybindings directly; instead, it relies on third party programs, e. g. sxhkd, for keybindings, making it modular. If you install BSPWM for the first time without setting up sxhkd properly, you may find yourself stuck on a black screen upon boot, requiring manual intervention to launch necessary applications.

In this post, I’ll explore how BSPWM integrates into my daily workflow, highlight its benefits, and demonstrate its scripting capabilities that enable seamless customization and control in window management. One note is that I won't go trough the installations steps, but is pretty straight forward for all linux distributions.

## How it Works

---

![BSPWM tiling way](/bspwm_tiling.png)

BSPWM organizes windows using a binary space partitioning method. This means that each new window is split recursively into the available space, maintaining a structured layout without overlaps.

Key characteristics:

- Dynamic tiling: Windows are tiled automatically, adapting to the screen (this is not a exception to BSPWM).
- No built-in keybindings: All interactions go through external programs (e.g., sxhkd).
- Unix Philosophy: BSPWM communicates via a socket-based system, allowing external tools to control it.

## Configuration

---

Unlike other WMs that use a config file with built-in options, BSPWM is configured via a shell script, usually found in:

```sh
~/.config/bspwm/bspwmrc
```

Here’s a minimal **bspwmrc** file:

```sh
#!/bin/sh

bspc monitor -d 1 2 3 4 5 6 7 8 9 10  # Define desktops
bspc config border_width 2
bspc config window_gap 8
bspc config focused_border_color "#ffcc00"
bspc config normal_border_color "#444444"

# Set rules for specific applications
bspc rule -a Alacritty state=floating
bspc rule -a Firefox desktop='^2' follow=on

# Autostart programs
picom &  # Compositor for transparency and animations
feh --bg-scale ~/Pictures/wallpaper.jpg &  # Set wallpaper
nm-applet &  # Network manager
```

Make sure the script is **executable**:

```sh
chmod +x ~/.config/bspwm/bspwmrc
```

With the config above you can see that is possible to make any script to run in bspwm config. So it's possible as well to make a external script and source in bspwmrc.

## Keybindings with SXHKD

---

Since BSPWM doesn’t handle keybindings internally, **sxhkd** is used for that. The **sxhkdrc** file typically resides in:

```sh
~/.config/sxhkd/sxhkdrc
```

Here’s an example setup:

```sh
# Open terminal
super + Return
    alacritty

# Close focused window
super + q
    bspc node -c

# Move focus
super + {h,j,k,l}
    bspc node -f {west,south,north,east}

# Swap windows
super + shift + {h,j,k,l}
    bspc node -s {west,south,north,east}

# Toggle floating
super + t
    bspc node -t floating
```

Reload sxhkd after modifying:

```sh
pkill -USR1 -x sxhkd
```

## Advanced Scripting and Modularity

---

### Resizing Windows Dynamically

Using shell scripting, we can create a **custom resizing function** for better window management:

```sh
#!/bin/sh
# Resize window using arrow keys
case "$1" in
    left) bspc node -z left -40 0  ;;  # Shrink left
    right) bspc node -z right 40 0  ;;  # Expand right
    up) bspc node -z top 0 -40  ;;  # Shrink upwards
    down) bspc node -z bottom 0 40  ;;  # Expand down
esac
```

Bind it to **sxhkdrc**:

```sh
super + alt + {h,j,k,l}
    ~/.config/bspwm/scripts/resize.sh {left,down,up,right}
```

### Automating Workspace Assignments

A script to launch applications in predefined desktops:

```sh
#!/bin/sh
bspc desktop 1 --focus
firefox &

bspc desktop 2 --focus
alacritty &
```

## Suggestion: Rofi as Launcher and Power Management Tool

---

Rofi is an excellent tool that complements BSPWM by providing an efficient application launcher, window switcher, and power management options. It integrates seamlessly into BSPWM, allowing quick access to applications and system functions without cluttering the desktop environment.

### Launching Applications with Rofi

You can bind Rofi to a key for launching applications. Add this to your **sxhkdrc**:

```sh
super + d
    rofi -show drun
```

This brings up a searchable application menu, making it easy to launch programs without opening a terminal. See my rofi launcher configuration below.

![Rofi launcher](/rofi_launcher.png)

The rofi above has a custom theme, which can be found [here](https://github.com/adi1090x/rofi).

### Power Management with Rofi

Rofi can also be used to manage power options (shutdown, reboot, suspend). Create a script for power management:

```sh
#!/bin/sh

echo -e "Shutdown
Reboot
Suspend" | rofi -dmenu -p "Power Menu" | while read action; do
    case "$action" in
        Shutdown) poweroff ;;
        Reboot) reboot ;;
        Suspend) systemctl suspend ;;
    esac
done
```

Save it as `~/.config/rofi/power-menu.sh`, make it executable:

```sh
chmod +x ~/.config/rofi/power-menu.sh
```

Now bind it to a key in `sxhkdrc`:

```sh
super + shift + p
    ~/.config/rofi/power-menu.sh
```

![Rofi power menu](/rofi_power.png)

This allows quick access to power management options.

## Why is Great for My Daily Uses

---

1. **Modularity** – No bloat, only the features I need.
2. **Scripting Power** – Full customization via shell scripts.
3. **Minimal Resource Usage** – Extremely lightweight.
4. **Tiling Efficiency** – Binary space partitioning optimizes screen space. I think this can be achieved by another WM as well.
5. **Decoupled Keybindings** – SXHKD allows easy remapping without modifying the WM itself.

## Thoughts

---

BSPWM is a powerful, scriptable tiling window manager that offers flexibility, making it really handy to customize the WM. By using shell scripts, sxhkd for keybindings, and modular utilities, it provides a seamless workflow that adapts to individual needs. For example, I have a keybind in sxhkdrc to translate selected text and display the original and translated text in a dunst popup, which is really handy for reading articles. Another one I use alongside translation is text-to-speech (TTS) for words I don’t know how to pronounce correctly.

Well, whether you’re a developer, sysadmin, or just want a lightweight and customizable desktop experience, BSPWM is a good choice for anyone looking to take full control over their window management.

Thanks for reading! If you have any suggestions, doubts, or critiques, feel free to reach out.\*
