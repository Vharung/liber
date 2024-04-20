export class HealthChangeAnimation {
    static showFloatingText(tokenDocument, text, color) {
        let canvasToken = canvas.tokens.get(tokenDocument.id);
        let floatingText = new PIXI.Text(text, { fontFamily: 'Arial', fontSize: 24, fill: color, stroke: 0x000000, strokeThickness: 4 });
        floatingText.position.set(canvasToken.center.x, canvasToken.center.y);
        canvas.stage.addChild(floatingText);

        // Animation du texte
        new TWEEN.Tween(floatingText)
            .to({ y: floatingText.y - 30, alpha: 0 }, 1000)
            .onComplete(() => canvas.stage.removeChild(floatingText))
            .start();
    }
}