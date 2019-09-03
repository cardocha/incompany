<?php

require_once(MODELS_DIR . 'BaseModel.php');

class Questao extends BaseModel
{
    private static $TABELA = "questao";

    function get_tabela(){
        return self::$TABELA;
    }

    public function get_por_material_id($material_id){
        $this->db->select('q.*, alt.id as alternativaCorretaId, alt.texto as alternativaCorretaTexto');
        $this->db->from($this->get_tabela(). ' q');
        $this->db->join('alternativa alt','alt.questao_id = q.id and alt.correta is not null and alt.correta', 'left');
        $this->db->where('material_id', $material_id);
        $this->db->order_by('ordem');
        $query = $this->db->get();
        return $query->result();
    }

    public  function remove_todas_alternativas($questao_id){
         parent::remove_todos($questao_id, 'questao_id', 'alternativa');
    }

    public function persistir($material)
    {
        return  parent::persiste($material, $this->get_tabela());
    }

    public function remover($material)
    {
        return  parent::remove($material['id'], 'id');
    }

}