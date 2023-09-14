import { Album, PrismaClient, Prisma } from '@prisma/client'
// import { Prisma } from "@prisma/client/edge";

class AlbumRepository{

  private prefix = 'album';
  private db: PrismaClient;

  constructor(){
    this.db = new PrismaClient()
  }

  async getAlbuns(): Promise<Album[]>{
    return this.db.album.findMany()
  }

  async getAlbum(id: string): Promise<Album>{
    const album :Album | null = await this.db.album.findUnique({
      where: {
        id: Number(id)
      }
    })

    if(!album){
      throw new Error("Not found")
    }

    return album;
  }

   async createAlbum(data: Omit<Album,'id'>) {
    return this.db.album.create({data})
  }

  async updateAlbum(id:string ,data: Partial<Album>) {
    return this.db.album.update({
      where:{
        id: Number(id),
      },
      data: data,
    })
  }
  async deleteAlbum(id:string) {
    return this.db.album.delete({
      where:{
        id: Number(id),
      }
    })
  }
}

export default AlbumRepository;