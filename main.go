package main

import (
	"context"
	"embed"
	"runtime"

	"github.com/leaanthony/u"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
	runtime2 "github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	isMacOS := runtime.GOOS == "darwin"
	// sysSvc := backend.System()
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:                    "wails-app",
		Width:                    960,
		Height:                   670,
		MinWidth:                 600,
		MinHeight:                400,
		Frameless:                !isMacOS,
		EnableDefaultContextMenu: false,
		StartHidden:              true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnDomReady: func(ctx context.Context) {
			runtime2.WindowShow(ctx)
		},
		SingleInstanceLock: &options.SingleInstanceLock{
			UniqueId:               "c9c8fd93-6758-4144-87d1-34bdb0a8bd60",
			OnSecondInstanceLaunch: app.onSecondInstanceLaunch,
		},
		DragAndDrop: &options.DragAndDrop{
			EnableFileDrop:     true,
			DisableWebViewDrop: false,
			CSSDropProperty:    "--wails-drop-target",
			CSSDropValue:       "drop",
		},
		Windows: &windows.Options{
			WebviewIsTransparent:              true,
			WindowIsTranslucent:               true,
			DisableFramelessWindowDecorations: false,
			WebviewGpuIsDisabled:              false,
			EnableSwipeGestures:               false,
			BackdropType:                      windows.Mica,
			Theme:                             windows.SystemDefault,
			WindowClassName:                   "wailsdemo",
			// CustomTheme: 最低 Windows 版本：Windows 10/11 2009/21H2 Build 22000
			CustomTheme: &windows.ThemeSettings{
				DarkModeBorder:          windows.RGB(50, 50, 50),
				DarkModeBorderInactive:  windows.RGB(50, 50, 50),
				LightModeBorder:         windows.RGB(210, 210, 210),
				LightModeBorderInactive: windows.RGB(210, 210, 210),
			},
			ResizeDebounceMS: 0,
			ZoomFactor:       1,
			DisablePinchZoom: true,
			OnSuspend:        func() {},
			OnResume:         func() {},
		},
		Mac: &mac.Options{
			TitleBar: mac.TitleBarHiddenInset(),
			// Appearance:           mac.NSAppearanceNameVibrantLight,
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			Preferences: &mac.Preferences{
				TabFocusesLinks:        u.False,
				TextInteractionEnabled: u.True,
				FullscreenEnabled:      u.False,
			},
			About: &mac.AboutInfo{
				Title:   "My App Name",
				Message: "Hello",
			},
			OnFileOpen: func(filePath string) {},
			OnUrlOpen:  func(filePath string) {},
		},
		//切换主题时，此背景色也需要更改
		BackgroundColour: options.NewRGBA(0, 0, 0, 0),
		OnStartup:        app.startup,
		OnShutdown:       app.shutdown,
		Bind: []any{
			app,
		},
		Debug: options.Debug{
			// OpenInspectorOnStartup: true,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
