import BaseEntity from "./base.entity"

export default class manutencaoPlaylistEntity extends BaseEntity{
    id:string;
    name : string;
    qtdMusicas: number;
    tempoTotal:string;


    constructor(data:manutencaoPlaylistEntity){
        super(data.id || "")
        this.name = data.name
        this.qtdMusicas = data.qtdMusicas
        this.tempoTotal = data.tempoTotal

    }
}