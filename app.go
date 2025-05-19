package main

import (
	"context"
	"fmt"
	"runtime"
	"wails-app/backend"

	"github.com/wailsapp/wails/v2/pkg/options"
	runtime2 "github.com/wailsapp/wails/v2/pkg/runtime"
)

var version = "0.0.0"
var sysSvc *backend.SystemService

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	sysSvc = backend.System()
	sysSvc.Start(ctx, version)

	runtime2.WindowExecJS(ctx, "window.wails.flags.disableDefaultContextMenu=true;")
}
func (a *App) shutdown(ctx context.Context) {
}

func (a *App) onSecondInstanceLaunch(secondInstanceData options.SecondInstanceData) {
	secondInstanceArgs := secondInstanceData.Args

	// println("user opened second instance", strings.Join(secondInstanceData.Args, ","))
	// println("user opened second from", secondInstanceData.WorkingDirectory)
	if runtime2.WindowIsMinimised(a.ctx) {
		runtime2.WindowUnminimise(a.ctx)
	}
	runtime2.Show(a.ctx)
	go runtime2.EventsEmit(a.ctx, "secondLaunchArgs", secondInstanceArgs)
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Platform() string {
	return runtime.GOOS
}

type ThemeMode string
const (
	ThemeModeSystem ThemeMode = "auto"
	ThemeModeDark  ThemeMode = "dark"
	ThemeModeLight ThemeMode = "light"
)

func (a *App) SetTheme(theme ThemeMode)  {
	// TODO: save theme into config file
	if runtime.GOOS == "windows" {
		switch theme {
		case ThemeModeDark:
			runtime2.WindowSetDarkTheme(a.ctx)
		case ThemeModeLight:
			runtime2.WindowSetLightTheme(a.ctx)
		case ThemeModeSystem:
			runtime2.WindowSetSystemDefaultTheme(a.ctx )
		} 
	}
}
