# Recuperação de Senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar a sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- o link enviado por email para resetar a senha, deve expirar em 2h;
- o usuário precisa confirmar sua nova senha ao resetar senha;

# Atualização de perfil

**RF**

 - O usuário deve poder atualizar seu nome, e-mail e senha;

**RN**

 - O usuário nao pode alterar seu e-mail para um e-mail já utilizado;

 - Para atualizar sua senha, o usuário deve informar a senha antiga;

 - Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Agendamento de Serviços

 **RF**

 - O usuário deve poder listar todos os prestadores de serviços cadastrados;
 - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
 - O usuario deve poder listar horários disponíveis em um dia específico de um prestador;
 - O usuário deve poder realizar agendamento com um prestador

 **RNF**

 - A listagem de prestadores deve ser armazenada em cache;

 **RN**

 - Cada agendamento deve durar 1h exatamente;
 - Os agendamentos devem estar disponíveis entre 08h às 18h (Primeiro às 08h, último as 17h);
 - Usuário não pode agendar em um horário já ocupado;
 - Usuário não pode agendar em um horário que já passou;
 - Usuário não pode agendar serviços consigo mesmo;

# Painel do prestador

**RF**

 - O usuário deve poder listar seus agendamentos de um dia específico;
 - O prestador deve receber uma notificação sempre que houver um novo agendamento;
 - O prestador deve poder visualizar as notificações não lidas;

**RNF**

 - Os agendamentos do prestador no dia devem ser armazenadas em cache;
 - As notificações do prestador devem ser armazenadas no MongoDB;
 - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

 - A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;
