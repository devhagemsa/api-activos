import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CrearActivoDto } from '../../application/dto/crear-activo.dto';
import { ActualizarActivoDto } from '../../application/dto/actualizar-activo.dto';
import { RetirarActivoDto } from '../../application/dto/retirar-activo.dto';
import { CambiarEstadoActivoDto } from '../../application/dto/cambiar-estado-activo.dto';
import { CambiarEstadoCalibracionDto } from '../../application/dto/cambiar-estado-calibracion.dto';
import { CambiarEstadoOperativoDto } from '../../application/dto/cambiar-estado-operativo.dto';
import { ActualizarDocumentoActivoDto } from '../../application/dto/actualizar-documento-activo.dto';
import { ActualizarEquipamientoActivoDto } from '../../application/dto/actualizar-equipamiento-activo.dto';
import { ActualizarImagenActivoDto } from '../../application/dto/actualizar-imagen-activo.dto';
import { ActivoResponseDto } from '../../application/dto/activo-response.dto';
import { CrearDocumentoActivoDto } from '../../application/dto/crear-documento-activo.dto';
import { CrearEquipamientoActivoDto } from '../../application/dto/crear-equipamiento-activo.dto';
import { CrearImagenActivoDto } from '../../application/dto/crear-imagen-activo.dto';
import { DocumentoActivoResponseDto } from '../../application/dto/documento-activo-response.dto';
import { EquipamientoActivoResponseDto } from '../../application/dto/equipamiento-activo-response.dto';
import { ImagenActivoResponseDto } from '../../application/dto/imagen-activo-response.dto';
import { ListarActivosFiltroDto } from '../../application/dto/listar-activos-filtro.dto';
import { PerfilCombustibleResponseDto } from '../../application/dto/perfil-combustible-response.dto';
import { PerfilFlotaResponseDto } from '../../application/dto/perfil-flota-response.dto';
import { CrearActivoUseCase } from '../../application/use-cases/crear-activo.use-case';
import { ListarActivosUseCase } from '../../application/use-cases/listar-activos.use-case';
import { ObtenerActivoUseCase } from '../../application/use-cases/obtener-activo.use-case';
import { ActualizarActivoUseCase } from '../../application/use-cases/actualizar-activo.use-case';
import { RetirarActivoUseCase } from '../../application/use-cases/retirar-activo.use-case';
import { ObtenerPerfilActivoUseCase } from '../../application/use-cases/obtener-perfil-activo.use-case';
import { CambiarEstadosActivoUseCase } from '../../application/use-cases/cambiar-estados-activo.use-case';
import { GestionarComplementosActivoUseCase } from '../../application/use-cases/gestionar-complementos-activo.use-case';
import { GestionarDocumentosActivoUseCase } from '../../application/use-cases/gestionar-documentos-activo.use-case';
import { Activo } from '../../domain/aggregates/activo.aggregate';
import { DocumentoActivo } from '../../domain/entities/documento-activo.entity';
import { EquipamientoActivo } from '../../domain/entities/equipamiento-activo.entity';
import { ImagenActivo } from '../../domain/entities/imagen-activo.entity';

@ApiTags('Activos')
@Controller('activos')
export class ActivosController {
  constructor(
    private readonly crearActivoUseCase: CrearActivoUseCase,
    private readonly listarActivosUseCase: ListarActivosUseCase,
    private readonly obtenerActivoUseCase: ObtenerActivoUseCase,
    private readonly obtenerPerfilActivoUseCase: ObtenerPerfilActivoUseCase,
    private readonly actualizarActivoUseCase: ActualizarActivoUseCase,
    private readonly cambiarEstadosActivoUseCase: CambiarEstadosActivoUseCase,
    private readonly gestionarDocumentosActivoUseCase: GestionarDocumentosActivoUseCase,
    private readonly gestionarComplementosActivoUseCase: GestionarComplementosActivoUseCase,
    private readonly retirarActivoUseCase: RetirarActivoUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ActivoResponseDto })
  @ApiConflictResponse({ description: 'Codigo de activo duplicado' })
  async crear(@Body() dto: CrearActivoDto) {
    return this.toResponse(await this.crearActivoUseCase.execute(dto));
  }

  @Get()
  @ApiOkResponse({ type: ActivoResponseDto, isArray: true })
  @ApiQuery({ name: 'codigo', required: false })
  @ApiQuery({ name: 'tipoActivo', required: false })
  @ApiQuery({ name: 'estadoActivo', required: false })
  @ApiQuery({ name: 'estadoOperativo', required: false })
  @ApiQuery({ name: 'estadoCalibracion', required: false })
  @ApiQuery({ name: 'placa', required: false })
  @ApiQuery({ name: 'plantillaInventario', required: false })
  async listar(@Query() filters: ListarActivosFiltroDto) {
    const activos = await this.listarActivosUseCase.execute(filters);
    return activos.map((activo) => this.toResponse(activo));
  }

  @Get('codigo/:codigo')
  @ApiOkResponse({ type: ActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async obtenerPorCodigo(@Param('codigo') codigo: string) {
    return this.toResponse(await this.obtenerActivoUseCase.byCodigo(codigo));
  }

  @Get(':id/perfil-flota')
  @ApiOkResponse({ type: PerfilFlotaResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async obtenerPerfilFlotaPorId(@Param('id') id: string) {
    return this.obtenerPerfilActivoUseCase.flotaPorId(id);
  }

  @Get('codigo/:codigo/perfil-flota')
  @ApiOkResponse({ type: PerfilFlotaResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async obtenerPerfilFlotaPorCodigo(@Param('codigo') codigo: string) {
    return this.obtenerPerfilActivoUseCase.flotaPorCodigo(codigo);
  }

  @Get('placa/:placa/perfil-flota')
  @ApiOkResponse({ type: PerfilFlotaResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async obtenerPerfilFlotaPorPlaca(@Param('placa') placa: string) {
    return this.obtenerPerfilActivoUseCase.flotaPorPlaca(placa);
  }

  @Get(':id/perfil-combustible')
  @ApiOkResponse({ type: PerfilCombustibleResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async obtenerPerfilCombustiblePorId(@Param('id') id: string) {
    return this.obtenerPerfilActivoUseCase.combustiblePorId(id);
  }

  @Get('codigo/:codigo/perfil-combustible')
  @ApiOkResponse({ type: PerfilCombustibleResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async obtenerPerfilCombustiblePorCodigo(@Param('codigo') codigo: string) {
    return this.obtenerPerfilActivoUseCase.combustiblePorCodigo(codigo);
  }

  @Get('codigo/:codigo/documentos')
  @ApiOkResponse({ type: DocumentoActivoResponseDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async listarDocumentosPorCodigo(@Param('codigo') codigo: string) {
    const documentos =
      await this.gestionarDocumentosActivoUseCase.listarPorCodigo(codigo);
    return documentos.map((documento) => this.toDocumentoResponse(documento));
  }

  @Post('codigo/:codigo/documentos')
  @ApiCreatedResponse({ type: DocumentoActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async crearDocumentoPorCodigo(
    @Param('codigo') codigo: string,
    @Body() dto: CrearDocumentoActivoDto,
  ) {
    return this.toDocumentoResponse(
      await this.gestionarDocumentosActivoUseCase.crearPorCodigo(codigo, dto),
    );
  }

  @Patch('codigo/:codigo/documentos/:documentoId')
  @ApiOkResponse({ type: DocumentoActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo o documento no encontrado' })
  async actualizarDocumentoPorCodigo(
    @Param('codigo') codigo: string,
    @Param('documentoId') documentoId: string,
    @Body() dto: ActualizarDocumentoActivoDto,
  ) {
    return this.toDocumentoResponse(
      await this.gestionarDocumentosActivoUseCase.actualizarPorCodigo(
        codigo,
        documentoId,
        dto,
      ),
    );
  }

  @Get('codigo/:codigo/imagenes')
  @ApiOkResponse({ type: ImagenActivoResponseDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async listarImagenesPorCodigo(@Param('codigo') codigo: string) {
    const imagenes =
      await this.gestionarComplementosActivoUseCase.listarImagenesPorCodigo(
        codigo,
      );
    return imagenes.map((imagen) => this.toImagenResponse(imagen));
  }

  @Post('codigo/:codigo/imagenes')
  @ApiCreatedResponse({ type: ImagenActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async crearImagenPorCodigo(
    @Param('codigo') codigo: string,
    @Body() dto: CrearImagenActivoDto,
  ) {
    return this.toImagenResponse(
      await this.gestionarComplementosActivoUseCase.crearImagenPorCodigo(
        codigo,
        dto,
      ),
    );
  }

  @Patch('codigo/:codigo/imagenes/:imagenId')
  @ApiOkResponse({ type: ImagenActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo o imagen no encontrada' })
  async actualizarImagenPorCodigo(
    @Param('codigo') codigo: string,
    @Param('imagenId') imagenId: string,
    @Body() dto: ActualizarImagenActivoDto,
  ) {
    return this.toImagenResponse(
      await this.gestionarComplementosActivoUseCase.actualizarImagenPorCodigo(
        codigo,
        imagenId,
        dto,
      ),
    );
  }

  @Get('codigo/:codigo/equipamiento')
  @ApiOkResponse({ type: EquipamientoActivoResponseDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async listarEquipamientoPorCodigo(@Param('codigo') codigo: string) {
    const equipamiento =
      await this.gestionarComplementosActivoUseCase.listarEquipamientoPorCodigo(
        codigo,
      );
    return equipamiento.map((item) => this.toEquipamientoResponse(item));
  }

  @Post('codigo/:codigo/equipamiento')
  @ApiCreatedResponse({ type: EquipamientoActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async crearEquipamientoPorCodigo(
    @Param('codigo') codigo: string,
    @Body() dto: CrearEquipamientoActivoDto,
  ) {
    return this.toEquipamientoResponse(
      await this.gestionarComplementosActivoUseCase.crearEquipamientoPorCodigo(
        codigo,
        dto,
      ),
    );
  }

  @Patch('codigo/:codigo/equipamiento/:equipamientoId')
  @ApiOkResponse({ type: EquipamientoActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo o equipamiento no encontrado' })
  async actualizarEquipamientoPorCodigo(
    @Param('codigo') codigo: string,
    @Param('equipamientoId') equipamientoId: string,
    @Body() dto: ActualizarEquipamientoActivoDto,
  ) {
    return this.toEquipamientoResponse(
      await this.gestionarComplementosActivoUseCase.actualizarEquipamientoPorCodigo(
        codigo,
        equipamientoId,
        dto,
      ),
    );
  }

  @Get(':id/documentos')
  @ApiOkResponse({ type: DocumentoActivoResponseDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async listarDocumentos(@Param('id') id: string) {
    const documentos = await this.gestionarDocumentosActivoUseCase.listar(id);
    return documentos.map((documento) => this.toDocumentoResponse(documento));
  }

  @Post(':id/documentos')
  @ApiCreatedResponse({ type: DocumentoActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async crearDocumento(
    @Param('id') id: string,
    @Body() dto: CrearDocumentoActivoDto,
  ) {
    return this.toDocumentoResponse(
      await this.gestionarDocumentosActivoUseCase.crear(id, dto),
    );
  }

  @Patch(':id/documentos/:documentoId')
  @ApiOkResponse({ type: DocumentoActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo o documento no encontrado' })
  async actualizarDocumento(
    @Param('id') id: string,
    @Param('documentoId') documentoId: string,
    @Body() dto: ActualizarDocumentoActivoDto,
  ) {
    return this.toDocumentoResponse(
      await this.gestionarDocumentosActivoUseCase.actualizar(
        id,
        documentoId,
        dto,
      ),
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: ActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async obtenerPorId(@Param('id') id: string) {
    return this.toResponse(await this.obtenerActivoUseCase.byId(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: ActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarActivoDto) {
    return this.toResponse(await this.actualizarActivoUseCase.execute(id, dto));
  }

  @Patch('codigo/:codigo/estado-activo')
  @ApiOkResponse({ type: ActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async cambiarEstadoActivoPorCodigo(
    @Param('codigo') codigo: string,
    @Body() dto: CambiarEstadoActivoDto,
  ) {
    return this.toResponse(
      await this.cambiarEstadosActivoUseCase.estadoActivoPorCodigo(
        codigo,
        dto,
      ),
    );
  }

  @Patch('codigo/:codigo/estado-operativo')
  @ApiOkResponse({ type: ActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async cambiarEstadoOperativoPorCodigo(
    @Param('codigo') codigo: string,
    @Body() dto: CambiarEstadoOperativoDto,
  ) {
    return this.toResponse(
      await this.cambiarEstadosActivoUseCase.estadoOperativoPorCodigo(
        codigo,
        dto,
      ),
    );
  }

  @Patch('placa/:placa/estado-operativo')
  @ApiOkResponse({ type: ActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async cambiarEstadoOperativoPorPlaca(
    @Param('placa') placa: string,
    @Body() dto: CambiarEstadoOperativoDto,
  ) {
    return this.toResponse(
      await this.cambiarEstadosActivoUseCase.estadoOperativoPorPlaca(
        placa,
        dto,
      ),
    );
  }

  @Patch('codigo/:codigo/estado-calibracion')
  @ApiOkResponse({ type: ActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async cambiarEstadoCalibracionPorCodigo(
    @Param('codigo') codigo: string,
    @Body() dto: CambiarEstadoCalibracionDto,
  ) {
    return this.toResponse(
      await this.cambiarEstadosActivoUseCase.estadoCalibracionPorCodigo(
        codigo,
        dto,
      ),
    );
  }

  @Patch(':id/estado-activo')
  @ApiOkResponse({ type: ActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async cambiarEstadoActivo(
    @Param('id') id: string,
    @Body() dto: CambiarEstadoActivoDto,
  ) {
    return this.toResponse(
      await this.cambiarEstadosActivoUseCase.estadoActivo(id, dto),
    );
  }

  @Patch(':id/estado-operativo')
  @ApiOkResponse({ type: ActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async cambiarEstadoOperativo(
    @Param('id') id: string,
    @Body() dto: CambiarEstadoOperativoDto,
  ) {
    return this.toResponse(
      await this.cambiarEstadosActivoUseCase.estadoOperativo(id, dto),
    );
  }

  @Patch(':id/estado-calibracion')
  @ApiOkResponse({ type: ActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async cambiarEstadoCalibracion(
    @Param('id') id: string,
    @Body() dto: CambiarEstadoCalibracionDto,
  ) {
    return this.toResponse(
      await this.cambiarEstadosActivoUseCase.estadoCalibracion(id, dto),
    );
  }

  @Patch(':id/siniestrar')
  @ApiOkResponse({ type: ActivoResponseDto })
  @ApiNotFoundResponse({ description: 'Activo no encontrado' })
  async siniestrar(@Param('id') id: string, @Body() dto: RetirarActivoDto) {
    return this.toResponse(
      await this.retirarActivoUseCase.execute(id, dto.observacion),
    );
  }

  private toResponse(activo: Activo): ActivoResponseDto {
    return activo.toPrimitives();
  }

  private toDocumentoResponse(
    documento: DocumentoActivo,
  ): DocumentoActivoResponseDto {
    const data = documento.toPrimitives();

    return {
      ...data,
      numero: data.numero ?? null,
      fechaEmision: data.fechaEmision ?? null,
      fechaVencimiento: data.fechaVencimiento ?? null,
      archivoUrl: data.archivoUrl ?? null,
      observacion: data.observacion ?? null,
    };
  }

  private toImagenResponse(imagen: ImagenActivo): ImagenActivoResponseDto {
    const data = imagen.toPrimitives();

    return {
      ...data,
      descripcion: data.descripcion ?? null,
    };
  }

  private toEquipamientoResponse(
    equipamiento: EquipamientoActivo,
  ): EquipamientoActivoResponseDto {
    const data = equipamiento.toPrimitives();

    return {
      ...data,
      descripcion: data.descripcion ?? null,
      observacion: data.observacion ?? null,
    };
  }
}
