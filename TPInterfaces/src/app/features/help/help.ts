import { Component } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';

interface FaqItem {
  id: string;
  question: string;
  answer: string[];
}

interface FaqSection {
  id: string;
  title: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-help',
  imports: [Footer],
  templateUrl: './help.html',
  styleUrl: './help.css'
})
export class Help {
  search = '';
  expandedIds = new Set<string>();

  sections: FaqSection[] = [
    {
      id: 'cuenta',
      title: 'Cuenta y suscripción',
      items: [
        {
          id: 'crear-cuenta',
          question: '¿Cómo creo una cuenta en Netflics?',
          answer: [
            'Entrá a la página de registro, ingresá tu email y elegí una contraseña de al menos 6 caracteres. Vas a recibir un mail de confirmación para activar la cuenta.',
            'Una vez activada podés elegir el plan que mejor te sirva desde la sección Planes.',
            'Ver planes disponibles',
          ],
        },
        {
          id: 'cambiar-plan',
          question: '¿Puedo cambiar de plan en cualquier momento?',
          answer: [
            'Sí. Podés subir o bajar de plan cuando quieras desde la configuración de tu cuenta, sin costo adicional por el cambio.',
            'Si subís de plan, la mejora se aplica al instante y se te cobra la diferencia proporcional. Si bajás, el cambio se hace efectivo al inicio del siguiente ciclo de facturación.',
            'Ir a mi cuenta',
          ],
        },
        {
          id: 'cancelar',
          question: '¿Cómo cancelo mi suscripción?',
          answer: [
            'Desde la configuración de tu cuenta, en la sección de suscripción, vas a encontrar la opción para cancelar. No hay períodos mínimos ni penalidades.',
            'Vas a poder seguir viendo contenido hasta que termine el período que ya pagaste.',
          ],
        },
        {
          id: 'recuperar-contrasena',
          question: 'Olvidé mi contraseña, ¿qué hago?',
          answer: [
            'En la pantalla de inicio de sesión tocá "¿Olvidaste tu contraseña?" e ingresá el email con el que te registraste. Te vamos a enviar un enlace para crear una nueva.',
            'El enlace vence a las 24 horas por seguridad. Si no te llega, revisá la carpeta de spam.',
          ],
        },
      ],
    },
    {
      id: 'reproduccion',
      title: 'Reproducción y dispositivos',
      items: [
        {
          id: 'dispositivos',
          question: '¿En qué dispositivos puedo ver Netflics?',
          answer: [
            'Podés ver contenido desde el navegador web, smart TVs, celulares y tablets Android o iOS, y consolas de videojuegos compatibles.',
            'La cantidad de dispositivos que podés usar en simultáneo depende de tu plan.',
            'Ver dispositivos compatibles',
          ],
        },
        {
          id: 'descargas',
          question: '¿Puedo descargar contenido para ver sin conexión?',
          answer: [
            'Las descargas están disponibles a partir del plan Gold. Vas a ver el ícono de descarga en las series y películas habilitadas.',
            'El contenido descargado se mantiene disponible por 30 días y se puede ver desde la app móvil sin conexión a internet.',
          ],
        },
        {
          id: 'calidad',
          question: 'El video se ve borroso o se corta, ¿qué puedo hacer?',
          answer: [
            'La calidad se ajusta automáticamente según tu conexión. Para reproducir en HD necesitás al menos 5 Mbps estables.',
            'Probá cerrar otras aplicaciones que usen internet, reiniciar el router, o bajar manualmente la calidad desde la configuración del reproductor.',
          ],
        },
        {
          id: 'subtitulos',
          question: '¿Cómo activo los subtítulos?',
          answer: [
            'Durante la reproducción, tocá el ícono de subtítulos en la barra de controles y elegí el idioma que prefieras.',
            'También podés dejar tu preferencia guardada desde la configuración de tu perfil para que se aplique en todo el contenido.',
          ],
        },
      ],
    },
    {
      id: 'pagos',
      title: 'Pagos y facturación',
      items: [
        {
          id: 'medios-pago',
          question: '¿Qué medios de pago aceptan?',
          answer: [
            'Aceptamos tarjetas de crédito y débito de las principales emisoras, además de billeteras virtuales y transferencia bancaria en algunos países.',
            'Los medios disponibles pueden variar según tu región.',
          ],
        },
        {
          id: 'ciclo-facturacion',
          question: '¿Cuándo se me cobra la suscripción?',
          answer: [
            'El cobro es mensual y se hace en la misma fecha en que activaste el plan. Vas a recibir un comprobante por email cada vez.',
            'Podés consultar el historial completo de pagos desde la sección de facturación en tu cuenta.',
          ],
        },
        {
          id: 'pago-rechazado',
          question: 'Mi pago fue rechazado, ¿qué hago?',
          answer: [
            'Primero verificá que los datos de la tarjeta estén correctos y que tenga fondos o límite disponible. También puede ser que el banco haya bloqueado el consumo.',
            'Vamos a reintentar el cobro automáticamente durante los siguientes días. Mientras tanto podés cargar otro medio de pago para no perder el acceso.',
            'Actualizar medio de pago',
          ],
        },
      ],
    },
  ];

  get filteredSections(): FaqSection[] {
    const term = this.search.trim().toLowerCase();

    if (!term) {
      return this.sections;
    }

    return this.sections
      .map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.question.toLowerCase().includes(term) ||
          item.answer.some(paragraph => paragraph.toLowerCase().includes(term))
        ),
      }))
      .filter(section => section.items.length > 0);
  }

  get hasResults(): boolean {
    return this.filteredSections.length > 0;
  }

  onSearchInput(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
  }

  toggleQuestion(id: string): void {
    if (this.expandedIds.has(id)) {
      this.expandedIds.delete(id);
    } else {
      this.expandedIds.add(id);
    }
  }

  isExpanded(id: string): boolean {
    return this.expandedIds.has(id);
  }
}