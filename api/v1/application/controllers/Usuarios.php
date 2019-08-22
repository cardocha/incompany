<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('BaseController.php');

class Usuarios extends BaseController {

    public function __construct()
    {
        parent::__construct();
		$this->load->helper('usuario_helper');
		carregar_dependencias();
    }

	public function index()
	{
		$method = parent::detectar_acao();
        if ($method === "GET") {
            $resultado_query = $this->usuario->get_todos('nome');
            echo json_encode($resultado_query);
        }
    }
    
     private function valida($usuario, $edicao)
    {
        $validacao = parent::get_validador($usuario);
        $validacao->set_rules('nome', 'Nome', 'required');
        $validacao->set_rules('email', 'E-mail', array('required','valid_email'));
        $validacao->set_rules('senha', 'Senha', array('required', 'min_length[5]'));
        $validacao->set_rules('tipo', 'Tipo', 'required');
        if ($edicao) {
            $validacao->set_rules('id', 'Identificação', 'is_natural_no_zero');
        }
        return $validacao->run();
    }

    protected function persistir($usuario)
    {
        $id = 0;
        $validacao = $this->valida((array) $usuario, false);
        $msg = "Usuário Salvo.";
        
        if ($validacao) {
            $id = $this->usuario->persistir((array)$usuario);
        } else {
            $msg = parent::get_errors();
        }
        
        echo parent::resposta_json($id > 0, $msg, null);
    }

    protected function remover($usuario)
    {
        $id = 0;
        $validacao = $this->valida((array) $usuario, true);
        $msg = "Usuário \"".$usuario->nome."\" Removido.";
        
        if ($validacao) {
            $id = $this->usuario->remover((array)$usuario);
        } else {
            $msg = parent::get_errors();
        }
        
        if(!$id)
            $msg = "Categoria ".$usuario->nome." possui Cursos vinculados";

        echo parent::resposta_json($id > 0, $msg, null);
    }
}
