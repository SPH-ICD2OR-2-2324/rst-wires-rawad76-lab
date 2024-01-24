namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
function UpdateCursor () {
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
function wire_4 () {
    red_count = 0
    blue_count = 0
    yellow_count = 0
    for (let value of WireList) {
        if (value == 0) {
            red_count += 1
        } else if (value == 2) {
            blue_count += 1
        } else if (value == 3) {
            yellow_count += 1
        }
    }
    if (red_count > 1 && SerialNumber % 2 == 1) {
        game.splash("Cut the last red wire")
    } else if (WireList[3] == 3 && red_count == 0) {
        game.splash("cut the fist wire")
    } else if (blue_count == 1) {
        game.splash("cut the fist wire")
    } else if (yellow_count > 1) {
        game.splash("cut the last wire")
    } else {
        game.splash("cut the second wire")
    }
}
function startPhase () {
    while (wireCount < 3 || wireCount > 6) {
        wireCount = game.askForNumber("# of wires? (3-6)", 1)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (wireCount == 3) {
        wire_3()
    } else if (wireCount == 4) {
        wire_4()
    } else if (wireCount == 5) {
        wire_5()
    } else if (wireCount == 6) {
    	
    }
})
function InitSerial () {
    SerialNumber = game.askForNumber("Last Digit of Serial Number", 1)
}
function InitWirePhase () {
    InitColours()
    InitCursor()
}
function wire_3 () {
    red_count = 0
    blue_count = 0
    for (let value of WireList) {
        if (value == 0) {
            red_count += 1
        } else if (value == 2) {
            blue_count += 1
        }
    }
    if (red_count == 0) {
        game.splash("Cut the 2nd wire")
    } else if (WireList[2] == 1) {
        game.splash("Cut the last wire")
    } else if (blue_count > 1) {
        game.splash("Cut the last blue wire")
    } else {
        game.splash("Cut the last wire")
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = WireList[cursorPos] - 1
    if (WireList[cursorPos] < 0) {
        WireList[cursorPos] = colourList.length - 1
    }
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function wire_6 () {
    red_count = 0
    blue_count = 2
    yellow_count = 3
    black_count = 4
    white_count = 1
    for (let value of WireList) {
        if (value == 0) {
            red_count += 1
        } else if (value == 2) {
            blue_count += 1
        } else if (value == 3) {
            yellow_count += 1
        } else if (value == 4) {
            black_count += 1
        }
    }
    if (yellow_count == 0 && SerialNumber % 2 == 1) {
        game.splash("cut the third wire")
    } else if (yellow_count == 1 && white_count > 1) {
        game.splash("cut the 4th wire")
    } else if (red_count == 0) {
        game.splash("cut the last wire")
    } else {
        game.splash("cut the 4th wire")
    }
}
function InitCursor () {
    mySprite = img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function InitColours () {
    colourList = [
    2,
    1,
    8,
    5,
    15
    ]
    WireList = []
    Ratio = wireCount + 1
    WireSprites = []
    for (let index = 0; index <= wireCount - 1; index++) {
        WireList.push(0)
        mySprite = img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `
        mySprite.fill(colourList[WireList[index]])
        mySprite.drawRect(0, 0, 160, 5, 15)
        WireSprites.push(mySprite)
        mySprite2 = sprites.create(mySprite, SpriteKind.Wire)
        mySprite2.top = Math.floor(120 / Ratio) * (index + 1)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function wire_5 () {
    red_count = 0
    blue_count = 2
    yellow_count = 3
    black_count = 4
    for (let value of WireList) {
        if (value == 0) {
            red_count += 1
        } else if (value == 2) {
            blue_count += 1
        } else if (value == 3) {
            yellow_count += 1
        } else if (value == 4) {
            black_count += 1
        }
    }
    if (WireList[4] && SerialNumber % 2 == 1) {
        game.splash("Cut the fourth wire")
    } else if (red_count == 1 && yellow_count > 1) {
        game.splash("cut the fist wire")
    } else if (black_count == 0) {
        game.splash("cut the second wire")
    } else {
        game.splash("cut the first wire")
    }
}
sprites.onCreated(SpriteKind.Wire, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += 1
    cursorPos = cursorPos % wireCount
    UpdateCursor()
})
let mySprite: Image = null
let white_count = 0
let black_count = 0
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let SerialNumber = 0
let WireList: number[] = []
let yellow_count = 0
let blue_count = 0
let red_count = 0
let Ratio = 0
let cursor: Sprite = null
let cursorPos = 0
let wireCount = 0
wireCount = 0
enum phase {start, wire, solve}
let state:phase=phase.start
startPhase()
if (wireCount > 3) {
    InitSerial()
}
state += 1
scene.setBackgroundColor(1)
InitWirePhase()
