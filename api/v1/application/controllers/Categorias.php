<?php
require_once(CONTROLLERS_DIR . 'BaseController.php');

class Categorias extends BaseController {

    public function __construct()
    {
		parent::__construct();
		$this->load->helper('categoria_helper');
		carregar_dependencias();
    }

	public function index()
	{
		$resultado_query = $this->categoria->get_todos('descricao');
		echo json_encode($resultado_query);
	}
}
