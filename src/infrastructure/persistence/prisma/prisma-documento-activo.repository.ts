import { Injectable } from '@nestjs/common';
import {
  DocumentoActivo,
  EstadoDocumentoActivo,
  TipoDocumentoActivo,
} from '../../../domain/entities/documento-activo.entity';
import {
  ActualizarDocumentoActivoParams,
  CrearDocumentoActivoParams,
  DocumentoActivoRepository,
} from '../../../domain/repositories/documento-activo.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaDocumentoActivoRepository
  implements DocumentoActivoRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findByActivoId(activoId: string): Promise<DocumentoActivo[]> {
    const documentos = await this.prisma.documentoActivo.findMany({
      where: { activoId },
      orderBy: [{ tipoDocumento: 'asc' }, { createdAt: 'desc' }],
    });

    return documentos.map((documento) => this.toDomain(documento));
  }

  async create(
    params: CrearDocumentoActivoParams,
  ): Promise<DocumentoActivo> {
    const documento = await this.prisma.documentoActivo.create({
      data: params,
    });

    return this.toDomain(documento);
  }

  async update(
    id: string,
    params: ActualizarDocumentoActivoParams,
  ): Promise<DocumentoActivo> {
    const documento = await this.prisma.documentoActivo.update({
      where: { id },
      data: params,
    });

    return this.toDomain(documento);
  }

  async existsForActivo(activoId: string, id: string): Promise<boolean> {
    const documento = await this.prisma.documentoActivo.findFirst({
      where: { id, activoId },
      select: { id: true },
    });

    return Boolean(documento);
  }

  private toDomain(record): DocumentoActivo {
    return new DocumentoActivo({
      ...record,
      tipoDocumento: record.tipoDocumento as TipoDocumentoActivo,
      estadoDocumento: record.estadoDocumento as EstadoDocumentoActivo,
    });
  }
}
