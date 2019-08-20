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
		$resultado_query = $this->usuario->get_registro_por_id(1);
		echo json_encode($resultado_query);
	}
}
