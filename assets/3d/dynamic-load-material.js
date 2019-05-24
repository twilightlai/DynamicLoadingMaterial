
cc.Class({
    extends: cc.Component,

    properties: {
        meshRenderer: cc.MeshRenderer,
        materialTextureArr: {
            default: [],
            type: cc.Texture2D
        },
        _defaultIndex: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    start() {
        this.scheduleOnce(() => {
            cc.loader.loadRes('materials/dynamic-load-material', cc.Material, (err, material) => {
                if (err) {
                    cc.error(err);
                    return;
                }
                this.material = material;

                this.meshRenderer.setMaterial(0, material);
            })
        }, 1);
    }, 

    update () {
        this.node.getChildByName("root").angle += 1;
    },

    //初始化贴图数据


    //动态修改材质贴图
    onModifyMaterialTexture () {
        this.material.setProperty("diffuseTexture", this.materialTextureArr[this._defaultIndex]);
        this._defaultIndex++;
        if (this._defaultIndex === this.materialTextureArr.length) {
            this._defaultIndex = 0;
        }
    }
    // update (dt) {},
});
