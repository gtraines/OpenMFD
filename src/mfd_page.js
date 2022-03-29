// MFD Page Classes

// Abstract class to derive other page classes from
class MFDPage {
    constructor(name, MFDObj) {
        this.mfd = MFDObj;
        this.returnPage = null;
        this.name = name;
    }

    getName() {
        return this.name;
    }
    
    setReturnPage(name) {
        this.returnPage = name;
    }

    handleMessage(msg) {
        // Handle a message from the autopilot
    }
    
    handleInput(btnId) {
        console.log(btnId);

        if (btnId == "D12") {
            // Go to return page or default page
            var return_page = null;
            if (this.returnPage != null) {
                return_page = this.returnPage;
                this.returnPage = null;
            } else
                return_page = this.mfd.getDefaultPage().getName();

            console.log("Moving to page " + return_page);
            this.mfd.setCurrentPage(return_page);
            return true;
        }
        
        return false;
    }

    drawPage() {
        var rightLimit = canvas.getCenter();
        var bottomLimit = canvas.getCenter();

        var returnText = new fabric.Text("RETURN >", {
            fontSize: "10pt",
            fontFamily: 'RobotoMono',
            fill: "limegreen",
            textAlign: "left",
            left: rightLimit,
            top: bottomLimit - 40
        });

        // Draw Return option (which basically every page has other
        // than the main menu)
        canvas.add(returnText);
        console.log(returnText);
        returnText.set({ left: rightLimit - returnText.width });
        canvas.renderAll();
    }
}

// Page for the main menu
class MainMenuPage extends MFDPage {
    handleInput(btnId) {
        switch(btnId) {
        case "D1":
            console.log("Moving to status page");
            this.mfd.getPage("status").setReturnPage(this.name);
            this.mfd.setCurrentPage("status");
            break;
        }
    }

    drawPage() {
        var textConfig = {
            fontSize: "10pt",
            fontFamily: 'RobotoMono',
            fill: "limegreen",
            textAlign: "left",
            left: 5,
            top: 15
        };

        var returnText = new fabric.Text("< STATUS",
                textConfig);
        //
        // ctx.fillText("MAIN MENU", 125, 15);
        // ctx.fillText("< STATUS", 5, 15);
        // ctx.fillText("< NAVIGATION", 5, 38);
        // ctx.fillText("< SYSTEMS", 5, 63);
        //
        // ctx.fillText("SETTINGS >", 242, 15);

        canvas.add(returnText);


        canvas.renderAll();
    }
}

class StatusPage extends MFDPage {
    constructor(name, MFDObj) {
        super(name, MFDObj);

        this.univ_time = 0.0;
        this.delta_t = 0.0;
        
        this.altASL = 0.0;
        this.altRadar = 0.0;

        this.speed = 0.0;
        this.vspeed = 0.0;

        this.heading = 0.0;

        this.roll = 0.0;
        this.pitch = 0.0;
        this.aoa = 0.0;
        this.ssa = 0.0;
    }

    handleMessage(msg) {
        if (msg["type"] == "telem") {
            this.univ_time = msg["univ_time"];
            this.delta_t = msg["delta_t"];
            this.altASL = msg["altASL"];
            this.altRadar = msg["altAGL"];
            this.speed = msg["speed"];
            this.vspeed = msg["vspeed"];
            this.heading = msg["heading"];
            this.roll = msg["roll"];
            this.pitch = msg["pitch"];
            this.aoa = msg["AoA"];
            this.ssa = msg["SSA"];
        }
        
        if (this.mfd.getCurrentPage() != this)
            return;
        
        this.mfd.clearScreen();
        this.drawPage();        
    }
    
    drawPage() {
        // Get super class to draw return button
        super.drawPage();

        var c = this.mfd.getDisplay();
        var ctx = c.getContext("2d");

        ctx.fillStyle = "limegreen";
        ctx.font = "10pt RobotoMono";
        ctx.textAlign = "left";

        ctx.fillText("dt: " + this.delta_t.toFixed(5), 2, 10);

        ctx.textAlign = "left";
        ctx.fillText("FLIGHT STATUS", 115, 15);

        ctx.textAlign = "left";
        ctx.fillText("TIME (UT): " + this.univ_time.toFixed(2)
                     + " s", 15, 35);
        ctx.fillText("ALT (ASL): " + this.altASL.toFixed(2)
                     + " m", 15, 50);
        ctx.fillText("ALT (RAD): " + this.altRadar.toFixed(2)
                     + " m", 15, 65);

        ctx.fillText("    Pitch: " + this.pitch.toFixed(2)
                     + " deg", 150, 35);
        ctx.fillText("     Roll: " + this.roll.toFixed(2)
                     + " deg", 150, 50);
        ctx.fillText("      AoA: " + this.aoa.toFixed(2)
                     + " deg", 150, 65);
        ctx.fillText("      SSA: " + this.ssa.toFixed(2)
                     + " deg", 150, 80);
        
        ctx.fillText("    SPEED: " + this.speed.toFixed(2)
                     + " m/s", 15, 80);
        ctx.fillText("     VSPD: " + this.vspeed.toFixed(2)
                     + " m/s", 15, 95);
        ctx.fillText("      HDG: " + this.heading.toFixed(2)
                     + " deg", 15, 110);
    }

    handleInput(btnId) {
        // Return if the super handled it
        if(super.handleInput(btnId))
            return;

        var c = this.mfd.getDisplay();
        var ctx = c.getContext("2d");
        
    }
}
