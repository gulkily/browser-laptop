/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const os = require('os')
const React = require('react')
const ImmutableComponent = require('./immutableComponent')
const currentWindow = require('../../app/renderer/currentWindow')

class WindowCaptionButtons extends ImmutableComponent {
  constructor () {
    super()
    this.onDoubleClick = this.onDoubleClick.bind(this)
    this.onMinimizeClick = this.onMinimizeClick.bind(this)
    this.onMaximizeClick = this.onMaximizeClick.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
    this.osClass = this.getPlatformCssClass()
  }

  get buttonClass () {
    return (this.props.windowMaximized ? 'fullscreen' : '')
  }

  getPlatformCssClass () {
    switch (os.platform()) {
      case 'win32':
        if (/10.0./.test(os.release())) {
          return 'win10'
        } else if (/6.1./.test(os.release())) {
          return 'win7'
        } else {
          return 'win'
        }
      default:
        return 'hidden'
    }
  }

  onMinimizeClick (e) {
    currentWindow.minimize()
  }

  onMaximizeClick (e) {
    return (!currentWindow.isMaximized()) ? currentWindow.maximize() : currentWindow.unmaximize()
  }

  onCloseClick (e) {
    currentWindow.close()
  }

  onDoubleClick (e) {
    if (!e.target.className.includes('navigatorWrapper')) {
      return
    }
    this.onMaximizeClick(e)
  }

  render () {
    return <div className='windowCaptionButtons'>
      <div className={'container ' + this.osClass}>
        <button className={this.buttonClass + ' captionButton minimize'} onClick={this.onMinimizeClick}><div className="widget" /></button>
        <button className={this.buttonClass + ' captionButton maximize'} onClick={this.onMaximizeClick}><div className="widget" /></button>
        <button className={this.buttonClass + ' captionButton close'} onClick={this.onCloseClick}><div className="widget1" /><div className="widget2" /></button>
      </div>
    </div>
  }
}

module.exports = WindowCaptionButtons
